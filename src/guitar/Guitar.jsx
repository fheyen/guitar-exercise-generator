import './Guitar.css';
import React, { PureComponent } from 'react';
import { generatePattern, generateXml } from './MusicXmlGenerator';
import patterns from './Patterns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { Utils } from 'musicvis-lib';
import { downloadXml } from '../lib';

class Guitar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: 'pentatonic G type',
            rootNote: 'C',
            tempo: 120,
            timeSig: '4/4',
            repeat: 4,
            alternate: true,
            pattern: [],
            currentAnimationPosition: null,
        };
    }

    /**
     * Animates the fretboard
     * @param {number} index
     * @param {number[][]} pattern
     * @param {number} tempo
     */
    animate(index, pattern, tempo) {
        if (index > pattern.length - 1) {
            this.setState({ currentAnimationPosition: null });
            return;
        }
        const [string, fret] = pattern[index];
        this.setState({ currentAnimationPosition: [string, fret] });
        const wait = Utils.bpmToSecondsPerBeat(tempo) * 1000;
        window.setTimeout(
            () => this.animate(index + 1, pattern, tempo),
            wait
        );
    }

    /**
     * Creates a downloadable MusicXML file
     */
    download = () => {
        const { type, rootNote, tempo, timeSig, repeat, alternate } = this.state;
        // Generate pattern
        const pattern = generatePattern(type, rootNote, repeat, alternate);
        // Generate XML
        const name = `[Guitar Exercise] ${rootNote} ${type} ${tempo} bpm`;
        const text = generateXml(name, tempo, timeSig, pattern);
        // Download text file
        const fileName = `${name}.musicxml`;
        downloadXml(fileName, text);
    };

    render() {
        const { type, rootNote, tempo, timeSig, repeat, alternate, currentAnimationPosition: currPos } = this.state;
        // Generate pattern
        const pattern = generatePattern(type, rootNote, repeat, alternate);

        // Create tab note-by-note
        const timeStringMatrix = [];
        timeStringMatrix.push(['e -', 'B -', 'G -', 'D -', 'A -', 'E -']);
        for (const position of pattern) {
            const [string, fret] = position;
            const timeSlice = Array.from({ length: 6 });
            for (let str = 1; str <= 6; str++) {
                if (str === string) {
                    timeSlice[str - 1] = `${fret}-`;
                } else {
                    timeSlice[str - 1] = fret > 9 ? '---' : '--';
                }
            }
            timeStringMatrix.push(timeSlice);
        }
        // Transform into string row-by-row
        let tab = `tempo = ${tempo} bpm\n`;
        const notesPerMeaure = +timeSig.split('/')[0];
        for (let string = 0; string < 6; string++) {
            // Measure lines
            let noteOfMeasure = 0;
            for (let time = 0; time < timeStringMatrix.length; time++) {
                tab = `${tab}${timeStringMatrix[time][string]}`;
                if (noteOfMeasure === notesPerMeaure && time < timeStringMatrix.length - 1) {
                    noteOfMeasure = 0;
                    tab = `${tab}|-`;
                }
                noteOfMeasure++;
            }
            tab = `${tab}\n`;
        }

        // Create fretboard preview
        const pattern2 = generatePattern(type, rootNote);
        const fretboard = Array.from({ length: 6 }).map(() => Array.from({ length: 25 }));
        for (const [i, position] of pattern2.entries()) {
            const [string, fret] = position;
            fretboard[string - 1][fret] = i + 1;
            // fretboard[string - 1][fret + 12] = i + 1 + pattern2.length;
        }
        // Options for pattern type
        const typeOptions = [];
        for (const [key, value] of patterns) {
            typeOptions.push(
                <option key={key} value={key}>
                    {value.name}
                </option>
            );
        }
        // Transform fretboard preview into JSX table
        const stringNotes = ['e', 'B', 'G', 'D', 'A', 'E'];
        const [hString, hFret] = currPos ?? [-1, -1];
        const board = fretboard.map((row, string) => {
            return (
                <tr key={row}>
                    <td key='note'>{stringNotes[string]}</td>
                    {row.map((value, fret) => {
                        let cName = '';
                        if (string + 1 === hString && fret == hFret) {
                            cName = 'highlight';
                        }
                        return (
                            <td
                                key={`${string} ${fret} ${value}`}
                                className={cName}
                            >
                                {value}
                            </td>
                        );
                    })}
                </tr>
            );
        });
        // HTML
        return (
            <div className="App">
                <h2>Options</h2>
                <div>
                    <label>
                        Type
                        <select onChange={event => this.setState({ type: event.target.value })}>
                            {typeOptions}
                        </select>
                    </label>
                    <label>
                        Root note
                        <select onChange={event => this.setState({ rootNote: event.target.value })}>
                            {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(d => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Tempo (bpm)
                        <input
                            type='number'
                            min='30'
                            max='200'
                            step='5'
                            defaultValue='120'
                            onInput={e => this.setState({ tempo: +e.target.value })}
                        />
                    </label>
                    <label>
                        Time signature
                        <select onChange={event => this.setState({ timeSig: event.target.value })}>
                            {['4/4', '3/4', '2/4'].map(d => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Repeat
                        <input
                            type='number'
                            min='1'
                            max='20'
                            step='1'
                            defaultValue='4'
                            onInput={e => this.setState({ repeat: +e.target.value })}
                        />
                    </label>
                    <label>
                        <button onClick={() => this.setState({ alternate: !this.state.alternate })}>
                            Alternate <FontAwesomeIcon icon={this.state.alternate ? faToggleOn : faToggleOff} />
                        </button>
                    </label>
                </div>
                <h2>Output</h2>
                <div>
                    <button onClick={this.download}>
                        Download MusicXML
                    </button>
                </div>
                <div>
                    <h3>Tab Preview</h3>
                    <textarea value={tab} readOnly>
                    </textarea>
                    <h3>Fretboard Preview</h3>
                    <table>
                        <tbody>
                            {board}
                            <tr>
                                <td></td>
                                {Array.from({ length: 25 }).map((d, i) => (
                                    <td key={i}>{i}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    <button
                        onClick={() => this.animate(0, pattern, tempo)}
                        disabled={currPos !== null}
                        title='Play the pattern on the fretboard at the set tempo'
                    >
                        Animate
                    </button>
                </div>
            </div>
        );
    }
}

export default Guitar;

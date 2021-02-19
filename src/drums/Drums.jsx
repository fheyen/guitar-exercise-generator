import './Drums.css';
import React, { PureComponent } from 'react';
import { generatePattern, generateXml } from './MusicXmlGenerator';
import patterns from './Patterns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { Utils } from 'musicvis-lib';
import { downloadXml } from '../lib';

class Drums extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: 'Snare only',
            tempo: 120,
            repeat: 4,
            currentAnimationPosition: null,
        };
    }

    // /**
    //  * Animates the fretboard
    //  * @param {number} index
    //  * @param {number[][]} pattern
    //  * @param {number} tempo
    //  */
    // animate(index, pattern, tempo) {
    //     if (index > pattern.length - 1) {
    //         this.setState({ currentAnimationPosition: null });
    //         return;
    //     }
    //     const [string, fret] = pattern[index];
    //     this.setState({ currentAnimationPosition: [string, fret] });
    //     const wait = Utils.bpmToSecondsPerBeat(tempo) * 1000;
    //     window.setTimeout(
    //         () => this.animate(index + 1, pattern, tempo),
    //         wait
    //     );
    // }

    /**
     * Creates a downloadable MusicXML file
     */
    download = () => {
        const { type, tempo, repeat } = this.state;
        // Generate pattern
        const pattern = generatePattern(type, repeat);
        // Generate XML
        const name = `[Drums Exercise] ${type} ${tempo} bpm`;
        const text = generateXml(name, tempo, '4/4', pattern);
        // Download text file
        const fileName = `${name}.musicxml`;
        downloadXml(fileName, text);
    };

    render() {
        const { type, tempo, repeat, currentAnimationPosition: currPos } = this.state;
        // Generate pattern
        const pattern = generatePattern(type, repeat);

        // Create tab note-by-note
        const timeRowMatrix = [];
        const positions = ['hihat-closed', 'hihat-pedal', 'hihat-open', 'cymbal-crash', 'cymbal-ride', 'cymbal-chinese', 'cymbal-splash', 'snare', 'tom-hi', 'tom-mid-hi', 'tom-mid-low', 'tom-low', 'tom-floor-hi', 'tom-floor-low', 'bass'];
        const labels = ['HHc', 'HHp', 'HHo', 'CrC', 'RC ', 'ChC', 'SpC', 'SN ', 'HT ', 'MHT', 'MLT', 'LT ', 'FTH', 'FTL', 'BD '];
        timeRowMatrix.push(labels);
        for (const drumHits of pattern) {
            const timeSlice = Array.from({ length: positions.length }).fill('--');
            for (const hit of drumHits) {
                if (hit === 'rest') {
                    continue;
                }
                const row = positions.indexOf(hit);
                timeSlice[row] = `x-`;
            }
            timeRowMatrix.push(timeSlice);
        }
        // Transform into string row-by-row
        let tab = `tempo = ${tempo} bpm\n`;
        const notesPerMeaure = 4;
        for (let row = 0; row < positions.length; row++) {
            // Measure lines
            let noteOfMeasure = 0;
            for (let time = 0; time < timeRowMatrix.length; time++) {
                tab = `${tab}${timeRowMatrix[time][row]}`;
                if (noteOfMeasure === notesPerMeaure && time < timeRowMatrix.length - 1) {
                    noteOfMeasure = 0;
                    tab = `${tab}|-`;
                }
                noteOfMeasure++;
            }
            tab = `${tab}\n`;
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
                        Tempo (bpm)
                        <input
                            type='number'
                            min='30'
                            max='400'
                            step='5'
                            defaultValue='120'
                            onInput={e => this.setState({ tempo: +e.target.value })}
                        />
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
                    {/* <button
                        onClick={() => this.animate(0, pattern, tempo)}
                        disabled={currPos !== null}
                        title='Play the pattern on the fretboard at the set tempo'
                    >
                        Animate
                    </button> */}
                </div>
            </div>
        );
    }
}

export default Drums;

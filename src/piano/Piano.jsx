// import './Guitar.css';
import React, { PureComponent } from 'react';
import { generatePattern, generateXml } from './MusicXmlGenerator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { Utils } from 'musicvis-lib';
import { downloadXml } from '../lib';
import { Scale } from '@tonaljs/tonal';
import PianoKeyboard from './PianoKeyboard';

class Piano extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: 'Scale',
            rootNote: 'C',
            scaleType: 'major',
            tempo: 120,
            timeSig: '4/4',
            repeat: 4,
            alternate: true,
            currentAnimationPosition: null,
        };
    }

    /**
     * Creates a downloadable MusicXML file
     */
    download = () => {
        const { type, rootNote, scaleType, tempo, timeSig, repeat, alternate } = this.state;
        // Generate pattern
        const pattern = generatePattern(type, rootNote, scaleType, repeat, alternate);
        // Generate XML
        let description = '';
        if (type === 'Scale') {
            description = `${rootNote} ${scaleType} scale`;
        }
        const name = `[Piano Exercise] ${description} ${tempo} bpm`;
        const text = generateXml(name, tempo, timeSig, pattern);
        // Download text file
        const fileName = `${name}.musicxml`;
        downloadXml(fileName, text);
    };

    render() {
        const { type, rootNote, scaleType, tempo, timeSig, repeat, alternate, currentAnimationPosition: currPos } = this.state;
        // Pattern for preview
        const pattern = generatePattern(type, rootNote, scaleType, 1, false);
        return (
            <div className="App">
                <h2>Options</h2>
                <div>
                    <label>
                        Type
                        <select onChange={event => this.setState({ type: event.target.value })}>
                            {['Scale'].map(d => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </label>
                    {type === 'Scale' &&
                        <div>
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
                                Scale
                                <select
                                    title='Scale name'
                                    onChange={(event) => this.setState({ scaleType: event.target.value })}
                                    defaultValue={scaleType}
                                >
                                    {Scale.names().sort().map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </label>
                            <span>
                                Notes: {Scale.get(`${rootNote} ${scaleType}`).notes.join(' ')}
                            </span>
                        </div>
                    }
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
                    <h3>Keyboard Preview</h3>
                    <PianoKeyboard
                        viewWidth={800}
                        viewHeight={200}
                        margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
                        pattern={pattern}
                        rootNote={rootNote}

                    />
                    {/* <button
                        onClick={() => this.animate(0)}
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

export default Piano;

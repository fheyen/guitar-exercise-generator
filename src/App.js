import './App.css';
import React, { PureComponent } from 'react';
import { generatePattern, generateXml } from './MusicXmlGenerator';

class App extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: 'pentatonic',
            rootNote: 'C',
            tempo: 120,
            timeSig: '4/4',
        };
    }

    /**
     * Creates a downloadable MusicXML file
     */
    download = () => {
        const { type, rootNote, tempo, timeSig } = this.state;
        // Generate XML
        const pattern = generatePattern(type, rootNote);
        const name = `[Guitar Exercise] ${rootNote} ${type} ${tempo} bpm`;
        const text = generateXml(name, tempo, timeSig, pattern);

        // Download text file
        const fileName = `${name}.musicxml`;
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    render() {
        return (
            <div className="App">
                <h1>Guitar Exercise Generator</h1>
                <h2>Options</h2>
                <div>
                    <label>
                        Type
                        <select onChange={event => this.setState({ type: event.target.value })}>
                            <option value='pentatonic'>
                                Pentatonic Scale
                        </option>
                            <option value='heptatonic'>
                                Heptatonic Scale
                        </option>
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
                            value='120'
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
                </div>
                <h2>Output</h2>
                <div>
                    <button onClick={this.download}>
                        Download MusicXML
                    </button>
                </div>
            </div>
        );
    }
}

export default App;

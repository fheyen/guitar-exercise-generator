import './App.css';
import React, { PureComponent } from 'react';
import { generatePattern, generateXml } from './MusicXmlGenerator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

class App extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            type: 'pentatonic',
            rootNote: 'C',
            tempo: 120,
            timeSig: '4/4',
            repeat: 4,
            alternate: true,
            textTab: '',
        };
    }

    componentDidMount() {
        this.toTextTab();
    }

    componentDidUpdate() {
        this.toTextTab();
    }

    /**
     * Renders preview as text tab
     */
    toTextTab() {
        const { type, rootNote, repeat, alternate } = this.state;
        // Generate XML
        const pattern = generatePattern(type, rootNote, repeat, alternate);

        const timeStringMatrix = [];
        timeStringMatrix.push(['e-', 'B-', 'G-', 'D-', 'A-', 'E-']);
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
        let result = '';
        for (let string = 0; string < 6; string++) {
            for (let time = 0; time < pattern.length; time++) {
                result = `${result}${timeStringMatrix[time][string]}`;
            }
            result = `${result}\n`;
        }
        console.log(result);
        this.setState({ textTab: result });
    }

    /**
     * Creates a downloadable MusicXML file
     */
    download = () => {
        const { type, rootNote, tempo, timeSig, repeat, alternate } = this.state;
        // Generate XML
        const pattern = generatePattern(type, rootNote, repeat, alternate);
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
                    <textarea value={this.state.textTab} readOnly>
                    </textarea>
                </div>
                <div className='githubLink'>
                    <a href='https://github.com/fheyen/guitar-exercise-generator'>
                        <FontAwesomeIcon icon={faGithub} />&nbsp;
                        https://github.com/fheyen/guitar-exercise-generator
                     </a>
                </div>
            </div>
        );
    }
}

export default App;

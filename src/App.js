import './App.css';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Guitar from './guitar/Guitar';
import Piano from './piano/Piano';
import Drums from './drums/Drums';

class App extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentInstrument: '',
        };
    }

    render() {
        const { currentInstrument } = this.state;
        return (
            <div className='App'>
                <h1>Music Exercise Generator</h1>
                <p>Choose an instrument!</p>
                <div>
                    {['Guitar', 'Piano', 'Drums', 'Ukulele'].map(d => (
                        <button
                            key={d}
                            onClick={() => this.setState({ currentInstrument: d })}
                            className={currentInstrument === d ? 'active' : ''}
                        >
                            {d}
                        </button>
                    ))}
                </div>
                <div>
                    {
                        currentInstrument === 'Guitar' && <Guitar />
                    }
                    {
                        currentInstrument === 'Piano' && <Piano />
                    }
                    {
                        currentInstrument === 'Drums' && <Drums />
                    }
                    {
                        currentInstrument === 'Ukulele' && <h2>Coming soon!</h2>
                    }
                </div>
                <div className='githubLink'>
                    <a href='https://github.com/fheyen/music-exercise-generator'>
                        <FontAwesomeIcon icon={faGithub} />&nbsp;
                        https://github.com/fheyen/music-exercise-generator
                     </a>
                </div>
            </div>
        );
    }
}

export default App;

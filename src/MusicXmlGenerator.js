import patterns from './Patterns';
import { Guitar } from 'musicvis-lib';

/**
 * Takes a baseline pattern and moves it to the correct position on the fretboard
 *
 * @param {string} patternType pattern type
 * @param {string} rootNote root note
 * @returns {number[][]} array of [string, fret] positions
 */
export function generatePattern(patternType, rootNote = 'A', repeat = 1, alternate = false) {
    const rootNotePositions = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
    const rootPos = rootNotePositions.indexOf(rootNote);
    const pattern = patterns.get(patternType);
    const shiftedToRoot = pattern.positions.map(d => {
        const [string, fret] = d;
        return [string, fret + rootPos];
    });
    if (repeat === 1) {
        return shiftedToRoot;

    }
    // Repeat with or without alternative diraction
    let result = shiftedToRoot;
    if (repeat > 1) {
        let reversed = [...shiftedToRoot].reverse();
        for (let repetition = 1; repetition < repeat; repetition++) {
            if (alternate && repetition % 2 === 1) {
                result = [...result, ...reversed];
            } else {
                result = [...result, ...shiftedToRoot];
            }
        }
    }
    return result;
}

/**
 * Generates MusicXML text from a pattern
 *
 * @param {string} name name
 * @param {number} tempo tempo in bpm
 * @param {string} timeSig time signature e.g. 4/4
 * @param {number[][]} positions the output of generatePattern
 */
export function generateXml(name, tempo, timeSig, positions) {
    timeSig = timeSig.split('/').map(d => +d);
    const notesPerMeasure = timeSig[0];
    let currentMeasure = 1;
    let currentNoteInMeasure = 1;
    let measuresString = '';
    for (const [string, fret] of positions) {
        if (currentNoteInMeasure > notesPerMeasure) {
            // Start new measure
            currentMeasure++;
            currentNoteInMeasure = 1;
            measuresString = `${measuresString}
            </measure>
            <measure number="${currentMeasure}">`;
        }
        currentNoteInMeasure++;
        // Get note and octave from position
        const tuning = Guitar.stringedTunings.get('Guitar').get(6)[0];
        const note = Guitar.getNoteInfoFromFretboardPos(string, fret, tuning);
        measuresString = `${measuresString}
            <note>
                <pitch>
                    <step>${note.name}</step>
                    <octave>${note.octave}</octave>
                </pitch>
                <notations>
                    <technical>
                        <fret>${fret}</fret>
                        <string>${string}</string>
                    </technical>
                </notations>
                <voice>1</voice>
                <duration>960</duration>
                <type>quarter</type>
            </note>`;
    }
    return `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<score-partwise>
    <work>
        <work-title />
    </work>
    <identification>
        <encoding>
            <software>https://github.com/fheyen/guitar-exercise-generator</software>
        </encoding>
    </identification>
    <part-list>
        <score-part id="P1">
            <part-name>${name}</part-name>
            <score-instrument id="P1-I1">
                <instrument-name>Steel String Guitar 1</instrument-name>
            </score-instrument>
            <midi-instrument id="P1-I1">
                <midi-channel>1</midi-channel>
                <midi-program>26</midi-program>
            </midi-instrument>
        </score-part>
    </part-list>
    <part id="P1">
        <measure number="1">
            <attributes>
                <divisions>960</divisions>
                <key>
                    <fifths>0</fifths>
                    <mode>major</mode>
                </key>
                <clef>
                    <sign>G</sign>
                    <line>2</line>
                </clef>
                <time>
                    <beats>${timeSig[0]}</beats>
                    <beat-type>${timeSig[1]}</beat-type>
                </time>
                <staff-details>
                    <staff-lines>6</staff-lines>
                    <staff-tuning line="1">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="2">
                        <tuning-step>A</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="3">
                        <tuning-step>D</tuning-step>
                        <tuning-octave>4</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="4">
                        <tuning-step>G</tuning-step>
                        <tuning-octave>4</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="5">
                        <tuning-step>B</tuning-step>
                        <tuning-octave>4</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="6">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>5</tuning-octave>
                    </staff-tuning>
                </staff-details>
            </attributes>
            <direction placement="above">
                <sound tempo="${tempo}" />
            </direction>
           ${measuresString}
        </measure>
    </part>
</score-partwise>
`;
}

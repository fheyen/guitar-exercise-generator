import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Scale } from '@tonaljs/tonal';
import { Piano, Utils, Midi } from 'musicvis-lib';

/**
 * @component
 */
class PianoKeyboard extends PureComponent {

    /**
     * @returns {JSX} jsx
     */
    render() {
        const { viewWidth, viewHeight, margin, pattern, rootNote } = this.props;
        const { minPitch, maxPitch } = Piano.pianoPitchRange.get(88);
        const whiteNotes = [];
        for (let pitch = minPitch; pitch <= maxPitch; pitch++) {
            if (!Midi.isSharp(pitch)) {
                whiteNotes.push(pitch);
            }
        }
        // Notes in pattern are highlighted
        const pitchesInPattern = new Set(pattern.map(d => Midi.getMidiNoteByNameAndOctave(...d).pitch));
        // Keys
        const height = viewHeight - margin.top - margin.bottom;
        const keyWidth = (viewWidth - margin.left - margin.right) / whiteNotes.length;
        const blackKeyWidth = keyWidth * 0.9;
        const whiteKeys = [];
        const blackKeys = [];
        const labels = [];
        const octaveMarkerPositions = [];
        let currentX = 0;
        for (let octave = -1; octave < 11; octave++) {
            for (let key = 0; key < 12; key++) {
                const pitch = octave * 12 + key;
                if (pitch < minPitch || pitch > maxPitch) {
                    continue;
                }
                const black = Midi.isSharp(pitch);
                const note = Midi.getMidiNoteByNr(pitch);
                // Position and size
                const x = black ? currentX - (0.5 * blackKeyWidth) : currentX;
                const y = black ? 0 : height * 0.02;
                const w = black ? blackKeyWidth : keyWidth;
                const h = black ? height * 0.6 : height * 0.98;
                if (pitch % 12 === 0) {
                    octaveMarkerPositions.push({ octave, x });
                }
                // Colors
                let color = '#f8f8f8';
                let textColor = '#111';
                let borderRadius = 5;
                if (pitchesInPattern.has(pitch)) {
                    // color = Utils.noteColorFromPitch(pitch);
                    color = 'steelblue';
                    // Show that this is the key of the scale
                    if (note.name === rootNote) {
                        borderRadius = 0;
                    }
                }
                // color = black ? '#222' : '#f8f8f8';
                // textColor = black ? '#eee' : '#222';
                const newKey = (
                    <rect
                        key={pitch}
                        width={w}
                        height={h}
                        x={x}
                        y={y}
                        rx={borderRadius}
                        ry={borderRadius}
                        fill={color}
                        stroke='#888'
                        strokeWidth='0.5'
                    >
                    </rect>
                );
                labels.push((
                    <text
                        key={pitch}
                        fontSize='10px'
                        style={{
                            fill: textColor,
                            textAnchor: 'middle',
                            alignmentBaseline: 'baseline',
                            writingMode: 'vertical-lr',
                            textOrientation: 'upright',
                        }}
                        x={x + 0.5 * w}
                        y={black ? h - 18 : h - 10}
                    >
                        {note.name}
                    </text>
                ));
                if (black) {
                    blackKeys.push(newKey);
                } else {
                    whiteKeys.push(newKey);
                    currentX += keyWidth;
                }
            }
        }
        // Octave indicators
        const octaveMarkers = [];
        const octaveMarkerLabels = [];
        const yPos = height + 15;
        for (let index = 0; index < octaveMarkerPositions.length - 1; index++) {
            const left = octaveMarkerPositions[index].x + 2;
            const right = octaveMarkerPositions[index + 1].x - 2;
            const d = `
                M ${left} ${yPos - 10}
                L ${left} ${yPos}
                L ${right} ${yPos}
                L ${right} ${yPos - 10}
            `;
            octaveMarkers.push((
                <path
                    key={d}
                    fill='none'
                    stroke='#888'
                    d={d}
                />
            ));
            octaveMarkerLabels.push((
                <text
                    key={d}
                    textAnchor='middle'
                    x={(left + right) / 2}
                    y={yPos + 12}
                    fill='#eee'
                    fontSize={12}
                >
                    Octave {octaveMarkerPositions[index].octave - 1}
                </text>
            ));
        }
        // HTML
        return (
            <div
                className={`PianoKeyboard`}
            >
                <svg
                    width={viewWidth}
                    height={viewHeight}
                >
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        {whiteKeys}
                        {blackKeys}
                        {labels}
                        {octaveMarkers}
                        {octaveMarkerLabels}
                    </g>
                </svg>
            </div >
        );
    }
}


PianoKeyboard.propTypes = {
    viewWidth: PropTypes.number.isRequired,
    viewHeight: PropTypes.number.isRequired,
    pattern: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default PianoKeyboard;

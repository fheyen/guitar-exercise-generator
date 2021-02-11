/**
 * Contains patterns for exercises, such as scales
 */
const patterns = new Map([
    ['pentatonic C type', {
        name: 'Pentatonic scale C type',
        rootNotePositions: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 0],
            [1, 3],
        ]
    }],
    ['pentatonic A type', {
        name: 'Pentatonic scale A type',
        rootNotePositions: ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 3],
            [3, 0],
            [3, 3],
            [2, 1],
            [2, 3],
            [1, 1],
            [1, 3],
        ]
    }],
    ['pentatonic G type', {
        name: 'Pentatonic scale G type',
        rootNotePositions: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 0],
            [6, 3],
            [5, 0],
            [5, 2],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 0],
            [2, 3],
            [1, 0],
            [1, 3],
        ]
    }],
    ['pentatonic E type', {
        name: 'Pentatonic scale E type',
        rootNotePositions: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 0],
            [5, 3],
            [4, 0],
            [4, 3],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 1],
            [1, 3],
        ]
    }],
    ['pentatonic D type', {
        name: 'Pentatonic scale D type',
        rootNotePositions: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 1],
            [4, 3],
            [3, 0],
            [3, 3],
            [2, 1],
            [2, 4],
            [1, 1],
            [1, 3],
        ]
    }],

    ['pentatonic all', {
        name: 'Pentatonic scale all',
        rootNotePositions: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
        // String fret pairs, strings are 0 (E4) to 5 (E2)
        positions: [
            // C
            [6, 0],
            [6, 3],
            [5, 0],
            [5, 3],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 0],
            [1, 3],
            // A
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 0],
            [4, 3],
            [3, 0],
            [3, 3],
            [2, 1],
            [2, 3],
            [1, 1],
            [1, 3],
            // G
            [6, 0],
            [6, 3],
            [5, 0],
            [5, 2],
            [4, 0],
            [4, 2],
            [3, 0],
            [3, 2],
            [2, 0],
            [2, 3],
            [1, 0],
            [1, 3],
            // E
            [6, 1],
            [6, 3],
            [5, 0],
            [5, 3],
            [4, 0],
            [4, 3],
            [3, 0],
            [3, 2],
            [2, 1],
            [2, 3],
            [1, 1],
            [1, 3],
            // D
            [6, 1],
            [6, 3],
            [5, 1],
            [5, 3],
            [4, 1],
            [4, 3],
            [3, 0],
            [3, 3],
            [2, 1],
            [2, 4],
            [1, 1],
            [1, 3],
        ],
    }],
]);

export default patterns;

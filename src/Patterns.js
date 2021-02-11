const patterns = new Map([
    ['pentatonic', {
        name: 'Pentatonic Scale (6 strings)',
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
]);

export default patterns;

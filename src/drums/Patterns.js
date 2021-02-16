/**
 * Contains patterns for exercises, such as scales
 */
const patterns = new Map([
    ['Snare only', {
        name: 'Snare only',
        // 'Chords' of drums to hit, e.g. ['bass', 'snare'] means hitting them both at the same time
        hits: [
            ['snare'],
        ]
    }],
    ['Bass only', {
        name: 'Bass only',
        hits: [
            ['bass'],
        ]
    }],
    ['Snare and bass alternating', {
        name: 'Snare and bass alternating',
        hits: [
            ['snare'],
            ['bass'],
        ]
    }],
    ['Snare and bass together', {
        name: 'Snare and bass together',
        hits: [
            ['snare', 'bass'],
        ]
    }],
    ['Snare and bass alternating / together', {
        name: 'Snare and bass alternating / together',
        hits: [
            ['snare'],
            ['snare', 'bass'],
        ]
    }],
    ['Snare and bass alternating / together 2', {
        name: 'Snare and bass alternating / together 2',
        hits: [
            ['snare', 'bass'],
            ['bass'],
        ]
    }],
]);

export default patterns;

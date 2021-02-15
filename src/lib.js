/**
 * Triggers an MusicXML file
 *
 * @param {string} fileName file name
 * @param {string} xmlString XML string
 */
export function downloadXml(fileName, xmlString) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(xmlString)}`);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

/**
 * Repeats a pattern with or without alternating direction
 * @param {number} nRepetitions number of repetitions
 * @param {*[]} pattern pattern
 * @param {boolean} alternate alternate direction?
 * @returns {*[]} repeated pattern
 */
export function repeatPattern(nRepetitions, pattern, alternate) {
    let result = pattern;
    if (nRepetitions > 1) {
        let reversed = [...pattern].reverse();
        for (let repetition = 1; repetition < nRepetitions; repetition++) {
            if (alternate && repetition % 2 === 1) {
                result = [...result, ...reversed];
            } else {
                result = [...result, ...pattern];
            }
        }
    }
    return result;
}

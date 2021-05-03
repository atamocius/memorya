/**
 * A promise wrapper for `setTimeout`.
 * @param {number} ms Wait time in milliseconds
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param {any[]} array
 */
export function shuffle(array) {
  let m = array.length;
  let temp;
  let i;

  // While there remain elements to shuffle...
  while (m) {
    // Pick a remaining element...
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    temp = array[m];
    array[m] = array[i];
    array[i] = temp;
  }

  return array;
}

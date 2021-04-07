/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 02-09-2019.
 */

// Gatsby wont build if window is not found. This seems to be an easy cure

const { Nothing } = require("nothing-mock");
const win = typeof window !== "undefined" ? window : Nothing;
const doc = typeof document !== "undefined" ? document : Nothing;

export { win, doc };

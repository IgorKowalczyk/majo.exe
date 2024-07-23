import path from "node:path";
import { globby as coreGlobby } from "globby";

function normalizePaths(patterns) {
 const normalized = Array.isArray(patterns) ? patterns : [patterns];
 const pats = normalized.map((n) => n.split(path.sep).join(path.posix.sep));
 return pats;
}

const globby = async function globby(patterns, options) {
 const pats = normalizePaths(patterns);
 return coreGlobby(pats, options);
};

globby.sep = path.sep;

globby.sync = function globbySync(patterns, options) {
 const pats = normalizePaths(patterns);
 return coreGlobby.sync(pats, options);
};

export { globby };

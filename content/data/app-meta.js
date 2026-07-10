// App version, read straight from package.json so there's exactly one place
// to bump it. Node-only (like every other content/data/*.js file) — the
// browser never imports this directly, it only sees the version baked into
// generated HTML (ueber.js) and into sw.js's CACHE name (see sw-gen.js),
// so bumping this file's source of truth is also what forces a cache reset.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const pkgPath = join(dirname(fileURLToPath(import.meta.url)), "../../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

export const VERSION = pkg.version;

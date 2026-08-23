import fs from "node:fs";
import path from "node:path";

const sourceUrl = "https://raw.githubusercontent.com/JoelEngelman/Survival-Skies/main/index.html";
const root = process.cwd();
const out = path.join(root, "index.html");

const html = await (await fetch(sourceUrl)).text();
if (!html.startsWith("<!doctype html>")) throw new Error("Could not read Survival Skies index.html");

const style = html.match(/<style>([\\s\\S]*?)<\\/style>/i);
const body = html.match(/<body>([\\s\\S]*?)<\\/body>/i);
const script = html.match(/<script>([\\s\\S]*?)<\\/script>/i);
if (!style || !body || !script) throw new Error("Missing style, body, or script block");

const write = (file, content) => {
  const target = path.join(out, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content.trimEnd() + "\\n");
};

// Document pieces: these are source fragments, not a fake runnable index.html.
write("document/head.html", `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Survival Skies</title>\n</head>`);
write("document/body.html", body[1]);
write("document/footer.html", "</html>");

// CSS is divided into responsibility-based files while preserving the exact source rules.
const css = style[1];
const cssSections = [
  ["01-base.css", /([\\s\\S]*?)(?=\\/\\* CUTSCENES \\*\\/)/],
  ["02-cutscenes.css", /(\\/\\* CUTSCENES \\*\\/[\\s\\S]*?)(?=\\/\\* UNDERGROUND LOOK \\*\\/)/],
  ["03-underground.css", /(\\/\\* UNDERGROUND LOOK \\*\\/[\\s\\S]*)/]
];
for (const [file, re] of cssSections) {
  const m = css.match(re);
  if (m?.[1]?.trim()) write(`css/${file}`, m[1]);
}

// JavaScript is split at the game's existing section headers, so dependency order stays intact.
const header = /\\/\\*\\s*=+\\s*\\n\\s*([^\\n*]+?)\\s*\\n(?:\\s*[^\\n*]+\\s*\\n)*\\s*=+\\s*\\*\\//g;
const matches = [...script[1].matchAll(header)];
if (!matches.length) throw new Error("No JavaScript section headers found");

const used = new Set();
const slug = (name, i) => {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${i + 1}`;
  let value = base, n = 2;
  while (used.has(value)) value = `${base}-${n++}`;
  used.add(value);
  return value;
};

for (let i = 0; i < matches.length; i++) {
  const start = matches[i].index;
  const end = i + 1 < matches.length ? matches[i + 1].index : script[1].length;
  const name = matches[i][1].trim();
  write(`js/${String(i + 1).padStart(2, "0")}-${slug(name, i)}.js`, script[1].slice(start, end));
}

write("SOURCE.md", `# Source map\n\nGenerated from \\`${sourceUrl}\\`.\n\nThe JavaScript files remain in their original execution order. The CSS and document fragments preserve the original content rather than rewriting the game.\n`);

console.log("Survival Skies modular source generated in index.html/");

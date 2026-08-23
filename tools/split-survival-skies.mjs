import fs from "node:fs";
import path from "node:path";

const sourceUrl = "https://raw.githubusercontent.com/JoelEngelman/Survival-Skies/main/index.html";
const root = process.cwd();
const out = path.join(root, "index.html");

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Could not fetch Survival Skies index.html: ${response.status}`);

const html = await response.text();
if (!html.trimStart().startsWith("<!doctype html>")) {
  throw new Error("Could not read Survival Skies index.html");
}

const style = html.match(/<style>([\s\S]*?)<\/style>/i);
const body = html.match(/<body>([\s\S]*?)<\/body>/i);
const script = html.match(/<script>([\s\S]*?)<\/script>/i);

if (!style || !body || !script) {
  throw new Error("Missing style, body, or script block in Survival Skies index.html");
}

const write = (file, content) => {
  const target = path.join(out, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content.trimEnd() + "\n", "utf8");
};

// Keep the original document structure as source fragments.
write(
  "document/head.html",
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Survival Skies</title>
</head>`
);
write("document/body.html", body[1]);
write("document/footer.html", "</html>");

// Split CSS at the existing responsibility markers.
const css = style[1];
const cssSections = [
  ["01-base.css", css.split("/* CUTSCENES */")[0]],
  [
    "02-cutscenes.css",
    "/* CUTSCENES */" +
      css.split("/* CUTSCENES */")[1].split("/* UNDERGROUND LOOK */")[0]
  ],
  [
    "03-underground.css",
    "/* UNDERGROUND LOOK */" + css.split("/* UNDERGROUND LOOK */")[1]
  ]
];

for (const [file, content] of cssSections) {
  if (content.trim()) write(`css/${file}`, content);
}

// Split JavaScript at the game's existing section headers.
// This preserves the original execution order and avoids rewriting game logic.
const js = script[1];
const header = /\/\*\s*=+\s*\n\s*([^\n*]+?)\s*\n\s*=+\s*\*\//g;
const matches = [...js.matchAll(header)];

if (!matches.length) {
  throw new Error("No JavaScript section headers found");
}

const used = new Set();

const slug = (name, i) => {
  const base =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `section-${i + 1}`;

  let value = base;
  let n = 2;

  while (used.has(value)) value = `${base}-${n++}`;
  used.add(value);
  return value;
};

for (let i = 0; i < matches.length; i++) {
  const start = matches[i].index;
  const end = i + 1 < matches.length ? matches[i + 1].index : js.length;
  const name = matches[i][1].trim();

  write(
    `js/${String(i + 1).padStart(2, "0")}-${slug(name, i)}.js`,
    js.slice(start, end)
  );
}

write(
  "SOURCE.md",
  `# Survival Skies modular source

Generated from: ${sourceUrl}

The JavaScript files remain in their original execution order.
The CSS and document fragments preserve the source content rather than rewriting the game.
`
);

console.log("Survival Skies modular source generated in index.html/");

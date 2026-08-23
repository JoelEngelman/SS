import fs from "node:fs";
import path from "node:path";

const sourceUrl = "https://raw.githubusercontent.com/JoelEngelman/Survival-Skies/main/index.html";
const root = process.cwd();
const out = path.join(root, "survival-skies");

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

write(
  "document/head.html",
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Survival Skies</title>\n</head>`
);
write("document/body.html", body[1]);
write("document/footer.html", "</html>");

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

const js = script[1];
const header = /\/\*\s*=+\s*\n\s*([^\n*]+?)\s*\n\s*=+\s*\*\//g;
const matches = [...js.matchAll(header)];

if (!matches.length) {
  throw new Error("No JavaScript section headers found");
}

const used = new Set();
const jsFiles = [];

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
  const file = `js/${String(i + 1).padStart(2, "0")}-${slug(name, i)}.js`;
  write(file, js.slice(start, end));
  jsFiles.push(file);
}

/* Development checkpoint: begin immediately after the underground sequence. */
const devFile = "js/99-dev-checkpoint.js";
write(devFile, `/* SURVIVAL SKIES DEVELOPMENT CHECKPOINT */

(() => {
  const DEV_CHECKPOINT = true;
  if (!DEV_CHECKPOINT) return;

  const intro = document.getElementById("intro");
  if (intro) intro.classList.add("hidden");

  stage = 14;
  components = 3;
  scrap = Math.max(scrap, 0);
  tunnelMode = false;
  tunnelEscaped = true;
  leaderHasBeenTold = false;

  player.x = 10750;
  player.y = 510 - player.h;
  player.spawnX = 10750;
  player.spawnY = 510 - player.h;
  player.vx = 0;
  player.vy = 0;
  player.grounded = true;
  player.grapple = null;

  camX = 10300;
  camY = 0;
  gameStarted = true;
  cutsceneActive = false;

  signalEl.style.width = "100%";
  componentsEl.textContent = "3/3";
  objective();
})();
`);
jsFiles.push(devFile);

const links = cssSections
  .filter(([, content]) => content.trim())
  .map(([file]) => `  <link rel="stylesheet" href="css/${file}">`)
  .join("\n");

const scripts = jsFiles
  .map(file => `  <script src="${file}"><\/script>`)
  .join("\n");

write(
  "index.html",
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Survival Skies</title>
${links}
</head>
<body>
<div id="survival-skies-body"></div>
<script>
(async () => {
  const target = document.getElementById("survival-skies-body");
  try {
    const response = await fetch("document/body.html");
    if (!response.ok) throw new Error("Could not load game body");
    target.outerHTML = await response.text();
    const scripts = [
${scripts}
    ];
    for (const src of scripts) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = () => reject(new Error("Could not load " + src));
        document.body.appendChild(s);
      });
    }
  } catch (error) {
    document.body.innerHTML = '<pre style="padding:30px;color:#fff;background:#071116;font:16px system-ui">SURVIVAL SKIES FAILED TO LOAD\\n\\n' + error.message + '</pre>';
    console.error(error);
  }
})();
</script>
</body>
</html>`
);

write(
  "SOURCE.md",
  `# Survival Skies modular source

Generated from: ${sourceUrl}

The JavaScript files remain in their original execution order.
The CSS and document fragments preserve the source content rather than rewriting the game.

This development build starts at stage 14, immediately after the underground escape, so later sections can be tested without replaying the earlier story.
`
);

console.log("Survival Skies modular source generated in survival-skies/");
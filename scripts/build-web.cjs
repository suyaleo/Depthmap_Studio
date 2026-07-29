const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'web-dist');
const files = [
  'index.html',
  'studio.css',
  'icon.svg',
  'icon-192.png',
  'manifest.json',
  'studio.json',
  'LICENSE',
  'NOTICE',
  'THIRD_PARTY_NOTICES.md',
  'TRADEMARKS.md'
];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}

fs.cpSync(path.join(root, 'assets'), path.join(out, 'assets'), { recursive: true });
fs.cpSync(path.join(root, 'schemas'), path.join(out, 'schemas'), { recursive: true });
fs.writeFileSync(
  path.join(out, 'version.json'),
  `${JSON.stringify({ name: 'Depthmap Studio', version: '1.0.0' }, null, 2)}\n`,
  'utf8'
);

process.stdout.write(`Web artifact: ${out}\n`);

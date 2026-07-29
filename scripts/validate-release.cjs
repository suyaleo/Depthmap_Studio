const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'studio.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const required = [
  'studio.json', 'LICENSE', 'NOTICE', 'THIRD_PARTY_NOTICES.md', 'TRADEMARKS.md',
  'SECURITY.md', '.env.example', '.gitignore', '.dockerignore', 'Dockerfile',
  'compose.yaml', '.github/workflows/ci.yml', '.github/workflows/release.yml'
];
const expected = {
  schemaVersion: 1,
  displayName: 'Depthmap Studio',
  repository: 'Depthmap_Studio',
  slug: 'depthmap-studio',
  version: '1.0.0',
  license: 'Apache-2.0',
  container: 'ghcr.io/suyaleo/depthmap-studio',
  defaultPort: 8790,
  healthEndpoint: '/api/health',
  dataDirectory: '/data',
  aiProfile: 'depthmap-studio'
};
const errors = [];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing ${file}`);
}
for (const [key, value] of Object.entries(expected)) {
  if (manifest[key] !== value) errors.push(`studio.json ${key} must be ${JSON.stringify(value)}`);
}
if (pkg.name !== expected.slug) errors.push('package.json name must equal studio slug');
if (pkg.version !== expected.version) errors.push('package.json version must equal studio version');
if (pkg.license !== expected.license) errors.push('package.json license must be Apache-2.0');
if (pkg.private !== false) errors.push('package.json private must be false');

const license = fs.readFileSync(path.join(root, 'LICENSE'), 'utf8');
if (!license.startsWith('Apache License\nVersion 2.0, January 2004')) {
  errors.push('LICENSE is not the canonical Apache-2.0 text');
}

if (errors.length) {
  process.stderr.write(`${errors.join('\n')}\n`);
  process.exit(1);
}
process.stdout.write('Release contract: PASS\n');

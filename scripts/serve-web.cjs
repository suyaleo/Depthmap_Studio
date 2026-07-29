const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.join(__dirname, '..', 'web-dist');
const host = process.env.DEPTHMAP_STUDIO_HOST || '0.0.0.0';
const port = Number.parseInt(process.env.DEPTHMAP_STUDIO_PORT || '8790', 10);
const version = '1.0.0';
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DEPTHMAP_STUDIO_PORT must be an integer from 1 through 65535.');
}

function json(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(`${JSON.stringify(body)}\n`);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  if (url.pathname === '/api/health') return json(res, 200, { status: 'ok', service: 'depthmap-studio' });
  if (url.pathname === '/api/version') return json(res, 200, { name: 'Depthmap Studio', version });

  const requested = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
  const resolved = path.resolve(root, requested);
  if (!resolved.startsWith(`${root}${path.sep}`) && resolved !== path.join(root, 'index.html')) {
    return json(res, 400, { error: 'invalid_path' });
  }

  let file = resolved;
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(root, 'index.html');
  res.writeHead(200, {
    'content-type': mime[path.extname(file)] || 'application/octet-stream',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'no-referrer'
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, host, () => {
  process.stdout.write(`Depthmap Studio web server listening on http://${host}:${port}\n`);
});

// One-shot script: rewrites the favicon <link> block in every HTML file
// to reference the new full favicon set with cache-busting query strings.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const OLD = `<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

const NEW = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=2">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png?v=2">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png?v=2">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=2">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">
<link rel="shortcut icon" href="/favicon.ico?v=2">
<link rel="manifest" href="/site.webmanifest?v=2">`;

// Walk the repo looking for *.html files
function* walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || ent.name === 'node_modules') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(full);
    else if (ent.name.endsWith('.html')) yield full;
  }
}

let updated = 0, skipped = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, 'utf8');
  if (!before.includes(OLD)) { skipped++; continue; }
  const after = before.replace(OLD, NEW);
  fs.writeFileSync(file, after, 'utf8');
  console.log('✓ updated', path.relative(ROOT, file));
  updated++;
}
console.log(`\nDone. ${updated} files updated, ${skipped} skipped (no match).`);

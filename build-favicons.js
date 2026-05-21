// Generate the full favicon set from favicon-source.png
// Trims surrounding whitespace, then resizes to every size browsers + Google + iOS look for.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'favicon-source.png');

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error('favicon-source.png not found at repo root');
    process.exit(1);
  }

  // 1. Trim the empty/white border around the logo and produce a square master.
  //    `trim` strips pixels that match the top-left pixel (white border).
  //    Then we extend to a square canvas (transparent) so the logo isn't distorted.
  const trimmed = await sharp(SRC)
    .trim({ threshold: 10 })       // remove white margins
    .toBuffer({ resolveWithObject: true });

  const { width, height } = trimmed.info;
  const side = Math.max(width, height);
  // Add a small breathing-room border (5% of the side) so the icon doesn't
  // touch the rounded square mask Apple/Android sometimes applies.
  const pad = Math.round(side * 0.04);
  const target = side + pad * 2;

  const master = await sharp(trimmed.data)
    .extend({
      top: Math.round((target - height) / 2),
      bottom: target - height - Math.round((target - height) / 2),
      left: Math.round((target - width) / 2),
      right: target - width - Math.round((target - width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  console.log(`Trimmed source: ${width}x${height}, master canvas: ${target}x${target}`);

  // 2. Resize to every favicon size we need.
  const sizes = [
    { name: 'favicon-16.png',       size: 16 },
    { name: 'favicon-32.png',       size: 32 },
    { name: 'favicon-48.png',       size: 48 },   // Google search minimum
    { name: 'favicon-96.png',       size: 96 },   // Google search preferred
    { name: 'apple-touch-icon.png', size: 180 },  // iOS home screen
    { name: 'icon-192.png',         size: 192 },  // PWA / Android
    { name: 'icon-512.png',         size: 512 },  // PWA splash
  ];

  for (const { name, size } of sizes) {
    await sharp(master)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
      .png({ compressionLevel: 9 })
      .toFile(path.join(__dirname, name));
    const finalSize = fs.statSync(path.join(__dirname, name)).size;
    console.log(`✓ ${name.padEnd(28)} ${size}x${size}   ${(finalSize/1024).toFixed(1)} KB`);
  }

  // 3. favicon.ico — a multi-resolution ICO containing 16/32/48
  //    Sharp can't write ICO natively, so we just write a 32px PNG as favicon.ico
  //    (modern browsers accept PNG-in-ICO). Older IE will fall back to the
  //    favicon.svg / favicon-16.png links in the HTML anyway.
  await sharp(master)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(__dirname, 'favicon.ico'));
  console.log(`✓ favicon.ico (32x32 PNG inside)`);

  console.log('\nAll favicons generated. Source kept at favicon-source.png for future regenerations.');
}

main().catch(err => { console.error(err); process.exit(1); });

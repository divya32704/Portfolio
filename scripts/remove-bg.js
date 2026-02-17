#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');

async function removeBg(input, output, threshold = 30) {
  if (!fs.existsSync(input)) {
    throw new Error(`Input file not found: ${input}`);
  }

  const img = sharp(input).ensureAlpha();
  const meta = await img.metadata();
  const width = meta.width;
  const height = meta.height;

  // Get RGB raw buffer
  const rgbaObj = await img.removeAlpha().raw().toBuffer({ resolveWithObject: true });

  // Build a single-channel mask by greyscaling + thresholding (bright areas -> 255)
  const maskObj = await img
    .removeAlpha()
    .greyscale()
    .threshold(Number(threshold))
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Ensure dimensions and channels match expectations
  if (rgbaObj.info.width !== maskObj.info.width || rgbaObj.info.height !== maskObj.info.height) {
    throw new Error('Input and mask dimensions do not match');
  }

  // Compose final image by joining the mask as alpha channel
  await sharp(rgbaObj.data, { raw: { width: rgbaObj.info.width, height: rgbaObj.info.height, channels: rgbaObj.info.channels } })
    .joinChannel(maskObj.data)
    .png()
    .toFile(output);

  console.log(`Wrote ${output}`);
}

// CLI
const [,, input, output, thr] = process.argv;
if (!input || !output) {
  console.error('Usage: node scripts/remove-bg.js <input.jpg> <output.png> [threshold]');
  process.exit(1);
}

removeBg(input, output, thr)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

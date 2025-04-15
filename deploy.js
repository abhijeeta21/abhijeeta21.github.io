/**
 * Simple script to help with static deployment for a user GitHub Pages site
 * 
 * How to use:
 * 1. Run 'npm run build' to generate the static site
 * 2. Copy the contents of the 'out' directory to the root of your repository
 */

const fs = require('fs');
const path = require('path');

console.log('Preparing static site for deployment to abhijeeta21.github.io...');

// Check if the out directory exists
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  console.error('Error: "out" directory not found. Run "npm run build" first.');
  process.exit(1);
}

console.log('Static site is ready in the "out" directory.');
console.log('\nFor user site (abhijeeta21.github.io):');
console.log('1. Copy all files from the "out" directory to the ROOT of your repository');
console.log('2. Make sure to include the .nojekyll file');
console.log('3. Commit and push the changes to the main branch');
console.log('\nAlternatively, use the GitHub Actions workflow for automatic deployment.');

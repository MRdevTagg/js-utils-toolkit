const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('Building package...');

if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

async function buildPackage() {
  try {
    console.log('Creating browser bundle...');
    await runCommand(
      'esbuild index.js --bundle --global-name=JSUtils --minify --format=iife --outfile=dist/utils.min.js'
    );
    
    console.log('Creating ES module bundle...');
    await runCommand(
      'esbuild index.js --bundle --minify --format=esm --outfile=dist/utils.esm.js'
    );
    
    console.log('Copying source files...');
    fs.copyFileSync(
      path.join(__dirname, 'GlobalState.js'),
      path.join(__dirname, 'dist', 'GlobalState.js')
    );
    fs.copyFileSync(
      path.join(__dirname, 'generalUtils.js'),
      path.join(__dirname, 'dist', 'generalUtils.js')
    );
    fs.copyFileSync(
      path.join(__dirname, 'index.js'),
      path.join(__dirname, 'dist', 'index.js')
    );
    fs.copyFileSync(
      path.join(__dirname, 'index.mjs'),
      path.join(__dirname, 'dist', 'index.mjs')
    );
    fs.copyFileSync(
      path.join(__dirname, 'cli.js'),
      path.join(__dirname, 'dist', 'cli.js')
    );
    
    console.log('Preparing package.json for distribution...');
    const packageJson = require('./package.json');
    const distPackageJson = {
      ...packageJson,
      main: './index.js',
      module: './index.mjs'
    };
    fs.writeFileSync(
      path.join(__dirname, 'dist', 'package.json'),
      JSON.stringify(distPackageJson, null, 2)
    );
    
    console.log('Copying documentation...');
    fs.copyFileSync(
      path.join(__dirname, 'README.md'),
      path.join(__dirname, 'dist', 'README.md')
    );

    console.log('Build completed successfully!');
    console.log('To publish this package:');
    console.log('1. npm install -g . # Test global installation');
    console.log('2. npm publish');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildPackage();

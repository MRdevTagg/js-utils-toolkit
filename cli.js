#!/usr/bin/env node

const { generalUtils } = require('./index.js');

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('JS Utils Toolkit CLI');
  console.log('Available commands:');
  console.log('  help              - Show this help message');
  console.log('  util <utilName>   - Show information about a specific utility');
  console.log('  list              - List all available utilities');
  process.exit(0);
}

function printUtilInfo(utilName) {
  if (generalUtils[utilName]) {
    console.log(`\n${utilName}:`);
    console.log(`- Type: Function`);
    console.log(`- Source: generalUtils.js`);
    console.log(`\nUsage example:`);
    console.log(`import { ${utilName} } from 'js-utils-toolkit';`);
  } else if (utilName === 'GlobalState') {
    console.log(`\nGlobalState:`);
    console.log(`- Type: Class`);
    console.log(`- Source: GlobalState.js`);
    console.log(`\nUsage example:`);
    console.log(`import { GlobalState } from 'js-utils-toolkit';`);
    console.log(`const state = GlobalState.create({...});`);
  } else {
    console.log(`Utility '${utilName}' not found.`);
  }
}

switch (command) {
  case 'help':
    console.log('JS Utils Toolkit CLI');
    console.log('Available commands:');
    console.log('  help              - Show this help message');
    console.log('  util <utilName>   - Show information about a specific utility');
    console.log('  list              - List all available utilities');
    break;
    
  case 'util':
    const utilName = args[1];
    if (!utilName) {
      console.log('Please specify a utility name.');
      console.log('Example: js-utils util objIf');
      process.exit(1);
    }
    printUtilInfo(utilName);
    break;
    
  case 'list':
    console.log('\nAvailable utilities:');
    console.log('\nGlobal State:');
    console.log('- GlobalState');
    
    console.log('\nObject utilities:');
    const objectUtils = [
      'isNonNullObject', 'onEntries', 'mapEntries', 'filterEntries',
      'onKeys', 'mapKeys', 'filterKeys', 'onValues', 'mapValues',
      'filterValues', 'transformEntries', 'objIf', 'safeParse'
    ];
    objectUtils.forEach(util => console.log(`- ${util}`));
    
    console.log('\nArray utilities:');
    const arrayUtils = ['arrIf', 'getBy'];
    arrayUtils.forEach(util => console.log(`- ${util}`));
    
    console.log('\nString utilities:');
    const stringUtils = ['capitalizeWords', 'camelCaseToCapital'];
    stringUtils.forEach(util => console.log(`- ${util}`));
    
    console.log('\nFunction utilities:');
    const functionUtils = ['safeCall', 'callOn', 'switchOn'];
    functionUtils.forEach(util => console.log(`- ${util}`));
    break;
    
  default:
    console.log(`Unknown command: ${command}`);
    console.log('Run "js-utils help" for a list of available commands.');
}

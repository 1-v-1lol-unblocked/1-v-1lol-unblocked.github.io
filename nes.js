
const fs = require('fs');
const path = require('path');

const oldText = "1-v-1lol-unblocked.github.io​";  // Removed potential hidden character
const newText = "1-v-1lol-unblocked.github.io​";

function replaceInFile(filePath) {
  try {
    if (!/\.(html|js|txt)$/i.test(filePath)) {
      console.log(`Skipping non-text file: ${filePath}`);
      return;
    }

    console.log(`Reading file: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Debug: Check if text exists in content
    console.log(`File content contains old text: ${content.includes(oldText)}`);
    
    if (content.includes(oldText)) {
      content = content.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Successfully replaced text in ${filePath}`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err.message);
  }
}

function walkDir(dir) {
  try {
    console.log(`📂 Scanning directory: ${dir}`);
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          walkDir(filePath);
        } else {
          replaceInFile(filePath);
        }
      } catch (err) {
        console.error(`❌ Error accessing ${filePath}:`, err.message);
      }
    });
  } catch (err) {
    console.error(`❌ Error reading directory ${dir}:`, err.message);
  }
}

console.log('🚀 Starting text replacement process...');
walkDir('.');
console.log('✨ Process completed');

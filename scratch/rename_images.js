const fs = require('fs');
const path = require('path');

const tempCheckDir = path.join(__dirname, '..', 'public', 'images', 'temp_check');
const destDir = path.join(__dirname, '..', 'public', 'images', 'projects');

const mappings = {
  'img_0.png': 'nexus_mockup.png',
  'img_1.png': 'myfitpal_mockup.png',
  'img_2.png': 'parkhive_mockup.png',
  'img_3.png': 'anthill_mockup.png',
  'img_4.png': 'solargrid_mockup.png',
  'img_5.png': 'notion_mockup.png',
  'img_6.png': 'starbucks_mockup.png',
  'img_7.png': 'blinkit_mockup.png'
};

Object.entries(mappings).forEach(([srcName, destName]) => {
  const srcPath = path.join(tempCheckDir, srcName);
  const destPath = path.join(destDir, destName);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully mapped and copied ${srcName} to public/images/projects/${destName}`);
  } else {
    console.warn(`Source file not found: ${srcPath}`);
  }
});

// Clean up temp_check folder
try {
  fs.rmSync(tempCheckDir, { recursive: true, force: true });
  fs.unlinkSync(path.join(__dirname, '..', 'public', 'temp_check.html'));
  console.log('Cleaned up temporary check directory and page.');
} catch (e) {
  console.error('Error during cleanup:', e.message);
}

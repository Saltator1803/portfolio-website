const fs = require('fs');
const path = require('path');

const tempDir = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\9bef760d-e5f9-43c3-8d47-a970af3f62d0\\.tempmediaStorage';
const destDir = path.join(__dirname, '..', 'public', 'images', 'temp_check');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Find files in tempDir starting with media_ and having timestamps 1783167 or 1783168
const files = fs.readdirSync(tempDir)
  .filter(f => f.startsWith('media_') && (f.includes('1783167') || f.includes('1783168')))
  .map(f => {
    const filePath = path.join(tempDir, f);
    const stat = fs.statSync(filePath);
    return { name: f, path: filePath, mtime: stat.mtimeMs };
  })
  .sort((a, b) => a.mtime - b.mtime); // sort by upload time

console.log(`Found ${files.length} uploaded files in tempmediaStorage.`);

files.forEach((f, idx) => {
  const ext = path.extname(f.name);
  const destName = `img_${idx}${ext}`;
  fs.copyFileSync(f.path, path.join(destDir, destName));
  console.log(`Copied ${f.name} to public/images/temp_check/${destName} (Uploaded: ${new Date(f.mtime).toISOString()})`);
});

// Generate temp_check.html
const htmlPath = path.join(__dirname, '..', 'public', 'temp_check.html');
let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Temp Check Images</title>
  <style>
    body { font-family: sans-serif; background: #222; color: #fff; padding: 20px; }
    .grid { display: grid; grid-template-cols: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .card { background: #333; padding: 10px; border-radius: 8px; text-align: center; }
    img { max-width: 100%; height: auto; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Uploaded Images Map Check</h1>
  <div class="grid">
`;

files.forEach((f, idx) => {
  const ext = path.extname(f.name);
  const destName = `img_${idx}${ext}`;
  htmlContent += `
    <div class="card">
      <h2>Index: ${idx}</h2>
      <p>${f.name}</p>
      <img src="/images/temp_check/${destName}" />
    </div>
  `;
});

htmlContent += `
  </div>
</body>
</html>
`;

fs.writeFileSync(htmlPath, htmlContent);
console.log(`Generated temp_check.html at ${htmlPath}`);

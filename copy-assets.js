const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\pcx.vn\\.gemini\\antigravity\\brain\\2c96437c-fc88-4cca-b667-71ee29b489a8';
const destDir = 'C:\\Users\\pcx.vn\\.gemini\\antigravity\\scratch\\wolfactive-landing\\assets';

const filesToCopy = [
    { src: 'wolfactive_official_banner_1788964225045.png', dest: 'official-banner.png' },
    { src: 'solution_running_club_1788963494168.png', dest: 'solution-running.png' },
    { src: 'solution_race_event_1788963512471.png', dest: 'solution-race.png' },
    { src: 'solution_pickleball_1788963531172.png', dest: 'solution-pickleball.png' },
    { src: 'wolfactive_official_logo_1788963722708.png', dest: 'official-logo.png' }
];

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

filesToCopy.forEach(item => {
    const srcPath = path.join(srcDir, item.src);
    const destPath = path.join(destDir, item.dest);
    try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Successfully copied ${item.src} -> ${item.dest} (${fs.statSync(destPath).size} bytes)`);
    } catch (err) {
        console.error(`Failed to copy ${item.src}:`, err.message);
    }
});

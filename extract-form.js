const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\pcx.vn\\.gemini\\antigravity\\brain\\2c96437c-fc88-4cca-b667-71ee29b489a8\\.system_generated\\steps\\439\\content.md', 'utf8');

const match = content.match(/var FB_PUBLIC_LOAD_DATA_ = (.*?);<\/script>/s);
if (match) {
    const data = JSON.parse(match[1]);
    console.log("Form Title:", data[1][8]);
    console.log("Form Description:", data[1][0]);
    
    const items = data[1][1];
    console.log("\n=== FORM QUESTIONS & ENTRY IDS ===");
    items.forEach((item, idx) => {
        if (!item || !item[1]) return;
        const qTitle = item[1];
        const entryId = item[4] ? item[4][0][0] : 'N/A';
        const qType = item[3]; // 0: short text, 1: paragraph, 2: radio, 3: dropdown, 4: checkbox
        console.log(`Question ${idx + 1}: "${qTitle}" (Type: ${qType}) -> entry.${entryId}`);
        if (item[4] && item[4][0] && item[4][0][1]) {
            console.log("  Options:", item[4][0][1].map(opt => opt[0]));
        }
    });
} else {
    console.log("FB_PUBLIC_LOAD_DATA_ not found");
}

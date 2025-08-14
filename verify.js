const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const filePath = path.join(__dirname, '..', 'keys.json');
    let keys = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const { key } = req.body;
    if (!key) return res.json({ success: false, message: 'Key required' });

    if (keys.includes(key)) {
        keys = keys.filter(k => k !== key);
        fs.writeFileSync(filePath, JSON.stringify(keys, null, 2));
        return res.json({ success: true });
    } else {
        return res.json({ success: false, message: 'Invalid or used key' });
    }
};

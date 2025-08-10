const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    const { key } = req.body;
    const filePath = path.join(__dirname, '../keys.json');
    const data = JSON.parse(fs.readFileSync(filePath));

    if (data.validKeys.includes(key)) {
        data.validKeys = data.validKeys.filter(k => k !== key);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return res.json({ success: true, redirect: "https://example.com" });
    } else {
        return res.json({ success: false, message: "Key salah atau sudah digunakan" });
    }
});

module.exports = app;

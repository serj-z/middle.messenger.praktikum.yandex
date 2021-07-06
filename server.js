const express = require("express");
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static('dist'));
// app.get('*', function (req, res) {
//     res.status(404).sendFile(path.join(__dirname, '/dist/pages/404/index.html'));
// });
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//create web server
const express = require('express');
const app = express();
const port = 3000;
//create a route to get comments

app.get('/comments', (req, res) => {
    res.json(comments);
});

//start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
const express = require('express');
const router = express.Router();
const fs = require('fs');
const FILE_NAME = 'nodes.json';

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});
router.get('/nodes', (req, res) => {
    res.send(fs.readFileSync(FILE_NAME));
});

/* PUT api listing. */
router.put('/nodes', (req, res) => {
    fs.writeFile(FILE_NAME, JSON.stringify(req.body), (err) => {
        if (err)
            console.log(err);
    });
    console.log(fs.readFileSync(FILE_NAME));
});
module.exports = router;
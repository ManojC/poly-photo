var express = require('express'),
    fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('home.html', {
        root: './public'
    });
});

/* GET home page. */
router.get('/get-images', function(req, res) {
    fs.readdir("./public/images/large", function(err, files) {
        if (err) {
            throw Error(err);
        }
        res.json(files);
    });
});

module.exports = router;
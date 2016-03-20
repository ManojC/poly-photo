var express = require('express'),
    gm = require('gm'),
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
    getImageNames(function(files) {
        res.json(files);
    });
});


router.get('/process-pics', function(req, res) {

    var response = {};

    getImageNames(function(files) {

        files.forEach(function(image, index, array) {

            var srcImage = './public/images/large/' + image;
            var destImage = './public/images/thumbs/' + image;

            gm(srcImage)
                .resizeExact(100, 100)
                .noProfile()
                .write(destImage, function(err) {
                    if (err) {
                        response[image] = 'failure';
                    }

                    response[image] = 'successful';

                    if (index >= array.length - 1) {
                        res.json(response);
                    }
                });
        });
    });

});


function getImageNames(callback) {

    fs.readdir("./public/images/large", function(err, files) {
        if (err) {
            throw Error(err);
        } else if (!files || !files.length) {
            throw Error('No images in specified folder');
        }
        callback(files);
    });
}

module.exports = router;
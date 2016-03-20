(function($, db, undefined) {

    'use strict'

    var mGallery = document.querySelector('#m-gallery')

    if (!mGallery) {
        throw Error('m-gallery polymer component not found!');
    }

    $.get('/get-images', function(files) {

        var imageData = [];

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                imageData.push({
                    url: 'images/large/' + files[i],
                    thumb: 'images/thumbs/' + files[i],
                    alt: _buildAlt(files[i])
                });
            };
            mGallery.imageData = imageData;
            mGallery.initGallery();
        }
    });

    function _buildAlt(image) {
        var image = image.substring(0, image.indexOf('.')).replace('-', ' ')

        return titleCase(image);
    }

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

})(jQuery, window.db = window.db || {});
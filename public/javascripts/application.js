(function($, db, undefined) {

    'use strict'

    var x = document.querySelector('#m-gallery')

    $.get('/get-images', function(files) {

        var imageData = [];

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                imageData.push({
                    url: 'images/large/' + files[i],
                    thumb: 'images/thumbs/' + files[i],
                    alt: files[i]
                });
            };
            x.imageData = imageData;
            x._initGallery();
        }
    });

})(jQuery, window.db = window.db || {});
(function($, db, undefined) {

    'use strict'

    function _titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    function _buildAlt(image) {
        var image = image.substring(0, image.indexOf('.')).replace('-', ' ')

        return _titleCase(image);
    }

    function _getImages(password) {

        $.get('/get-images?pass=' + password, function(files) {

            var imageData = [];

            if (files && files.length) {

                var mGallery = document.querySelector('#m-gallery')

                if (!mGallery) {
                    throw Error('m-gallery polymer component not found!');
                }

                for (var i = 0; i < files.length; i++) {
                    imageData.push({
                        url: 'images/large/' + files[i],
                        thumb: 'images/thumbs/' + files[i],
                        alt: _buildAlt(files[i])
                    });
                };
                mGallery.imageData = imageData;
                mGallery.initGallery();
            } else {
                _acceptPassword('Incorrect password, enter correct password!');
            }
        });
    }

    function _acceptPassword(prompt) {
        var password = window.prompt(prompt ? prompt : "Enter password..");
        if (password && password.length)
            _getImages(password);
        else
            _acceptPassword("Password can't be empty,, enter correct password!");
    }

    _acceptPassword();

})(jQuery, window.db = window.db || {});
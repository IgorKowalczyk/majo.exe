//---------------------------------------------------------------------
// Images
// Contains functions for image management.
//---------------------------------------------------------------------

const JIMP = require('jimp');

const Images = {};

Images.DBM = null;

Images.getImage = function(url) {
	if(!url.startsWith('http')) url = this.DBM.Actions.getLocalFile(url);
	return JIMP.read(url);	
};

Images.getFont = function(url) {
	return JIMP.loadFont(this.DBM.Actions.getLocalFile(url));	
};

Images.createBuffer = function(image) {
	return new Promise(function(resolve, reject) {
		image.getBuffer(JIMP.MIME_PNG, function(err, buffer) {
			if(err) {
				reject(err);
			} else {
				resolve(buffer);
			}
		});
	});
};

Images.drawImageOnImage = function(img1, img2, x, y) {
	for(let i = 0; i < img2.bitmap.width; i++) {
		for(let j = 0; j < img2.bitmap.height; j++) {
			var pos = (i * (img2.bitmap.width * 4)) + (j * 4);
			var pos2 = ((i + y) * (img1.bitmap.width * 4)) + ((j + x) * 4);
			var target = img1.bitmap.data;
			var source = img2.bitmap.data;
			for(let k = 0; k < 4; k++) {
				target[pos2 + k] = source[pos + k];
			}
		}
	}
};

module.exports = Images;
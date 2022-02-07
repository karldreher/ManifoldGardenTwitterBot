/*
  A simple Twitter bot that posts random images.
  Tutorial: https://botwiki.org/resource/tutorial/random-image-tweet/
*/

const fs = require('fs'),
  path = require('path'),
  Twit = require('twit'),
  extfs = require('extfs'),
  config = require(path.join(__dirname, 'config.js'));

const T = new Twit(config);
var logcounter = 1

function randomFromArray(images) {
  /* Helper function for picking a random item from an array. */
  return images[Math.floor(Math.random() * images.length)];
}

function tweetRandomImage() {
  /* First, read the content of the images folder. */

  fs.readdir(__dirname + '/images', function (err, files) {
    if (err) {
      console.log('error:', err);
      return;
    }
    else {
      let images = [];
      files.forEach(function (f) {
        images.push(f);
      });

      /* Then pick a random image. */

      console.log('opening an image...');

      const imagePath = path.join(__dirname, '/images/' + randomFromArray(images)),
        b64content = fs.readFileSync(imagePath, { encoding: 'base64' });

      /* Upload the image to Twitter. */

      console.log('uploading an image...', imagePath);

      T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        if (err) {
          console.log('error:', err);
        }
        else {
          console.log('image uploaded, now tweeting it...');

          /* And finally, post a tweet with the image. */

          T.post('statuses/update', {
            media_ids: new Array(data.media_id_string),
            status: [config.hashtags.join(" ")]
          },
            function (err, data, response) {
              if (err) {
                console.log('error:', err);
              }
              else {
                console.log('posted an image!');

                /* After successfully tweeting, we can delete the image.
                   Keep this part commented out if you want to keep the image and reuse it later. */

                fs.unlink(imagePath, function (err) {
                  if (err) {
                    console.log('error: unable to delete image ' + imagePath);
                  }
                  else {
                    console.log('image ' + imagePath + ' was deleted');
                  }
                });
              }
            }
          );
        }
      });
    }
  });
}

setInterval(function () {


  if (extfs.isEmptySync(path.join(__dirname, '/images/'))) {
    if (logcounter < 4){
      console.log("Directory empty, nothing to do.  Trying again in 10 seconds.")
    } else if (logcounter == 4) {
      console.log("Continuing to watch for new images.  Suppressing log output until next event.")
    }

  } else {
    tweetRandomImage();
    logcounter = 1
  }
  logcounter += 1
}, 10000);

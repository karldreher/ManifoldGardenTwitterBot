const fs = require("fs")
const path = require("path")
const extfs = require("extfs")

const Twit = require("twit")
const config = require(path.join(__dirname, "config.js"));
const T = new Twit(config);

var logcounter = 1;

function deleteImage(imagePath) {
  fs.unlink(imagePath, function (err) {
    if (err) {
      console.log("error: unable to delete image " + imagePath);
    } else {
      console.log("image " + imagePath + " was deleted");
    }
  });
}

function tweetRandomImage() {
  fs.readdir(__dirname + "/images", function (err, files) {
    if (err) {
      console.log("error:", err);
      return;
    } else {
      let images = [];
      files.forEach(function (f) {
        images.push(f);
      });

      console.log("opening an image...");

      const imagePath = path.join(
          __dirname,
          "/images/" + images[Math.floor(Math.random() * images.length)]
        ),
        b64content = fs.readFileSync(imagePath, { encoding: "base64" });

      console.log("uploading an image...", imagePath);

      T.post(
        "media/upload",
        { media_data: b64content },
        function (err, data, response) {
          if (err) {
            console.log("error:", err);
          } else {
            console.log("image uploaded, now tweeting it...");

            T.post(
              "statuses/update",
              {
                media_ids: new Array(data.media_id_string),
                status: [config.hashtags.join(" ")],
              },
              function (err, data, response) {
                if (err) {
                  console.log("error:", err);
                } else {
                  console.log("posted an image!");
                  deleteImage(imagePath);
                }
              }
            );
          }
        }
      );
    }
  });
}

setInterval(function () {
  if (extfs.isEmptySync(path.join(__dirname, "/images/"))) {
    if (logcounter < 4) {
      console.log(
        "Directory empty, nothing to do.  Trying again in 10 seconds."
      );
    } else if (logcounter == 4) {
      console.log(
        "Continuing to watch for new images.  Suppressing log output until next event."
      );
    }
  } else {
    tweetRandomImage();
    logcounter = 1;
  }
  logcounter += 1;
}, 10000);

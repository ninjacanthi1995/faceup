var express = require("express");
var router = express.Router();
var uniqid = require("uniqid");
var cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "la-capsule-chau",
  api_key: "215156496698694",
  api_secret: "a_eGuCdkfLlPZsizH_XWeYsVwwg",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", async (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ result: false, msg: "No files were uploaded." });
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.photo;
  uploadPath = "./tmp/" + uniqid() + ".jpg";

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).json({ result: false, msg: err });
  });

  const resCloudinary = await cloudinary.uploader.upload(uploadPath);
  fs.unlinkSync(uploadPath);
  res.json({ result: resCloudinary, msg: "File uploaded!" });
});

module.exports = router;

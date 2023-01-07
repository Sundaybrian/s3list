const express = require("express");

const router = express.Router();

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, AWS_STORAGE_BUCKET } =
  process.env;

var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_REGION,
});
var s3 = new AWS.S3();

router.get("/", async (req, res, next) => {
  const { limit = 200, nextMarker = "" } = req.query;

  var params = {
    Bucket: AWS_STORAGE_BUCKET,
    Delimiter: "/",
    MaxKeys: limit, // limit
    //Prefix: "20200219", // for searching
    //   Marker: "20191203-082457_255745374723-all.mp3", // for paging
  };

  if (req.query.search) {
    params["Prefix"] = req.query.search;
  }

  if (req.query.nextPage) {
    params["Marker"] = req.query.nextPage;
  }

  try {
    const data = await s3.listObjects(params).promise();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

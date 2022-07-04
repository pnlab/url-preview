// install express with `npm install express`
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const getMetaData = require("metadata-scraper");
const app = express();
const linkPreview = require("link-preview-js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(404).send("url is required");
  }
  try {
    // const metadata = await getMetaData(url);
    // console.log(url, metadata);
    // return res.send(metadata);
    const preview = await linkPreview.getLinkPreview(url, {
      headers: {
        "user-agent": "googlebot",
        "Access-Control-Allow-Origin": "*",
      },
      timeout: 1000,
    })
    console.log(url, preview);
    return res.send(preview);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

app.listen(5000);
// export 'app'
module.exports = app;

module.exports = function (app) {
  var mongoose = require('mongoose');
  var amazonS3 = require('awssum-amazon-s3');

  var s3 = new amazonS3.S3({
    'accessKeyId'     : app.get('s3').key,
    'secretAccessKey' : app.get('s3').secret,
    'region'          : amazonS3.US_EAST_1,
  });

  /*
   * GET users listing.
   */
  
  return {
    view: function(req, res){
      if(!req.params.id) {
        res.json(500, {message: "/view requries an id."});
      } else {
        // increment counters
        // return url of the image
        // 
        res.json(200, {name: req.params.id, size: req.params.size});
      }
    },

    upload: function (req, res) {
      // upload an image using s3
      res.json(200, req.body);
    }
  };

}

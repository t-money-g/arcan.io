'use strict';

var _ = require('lodash'),
  Post = require('./post.model'),
  path = require('path'),
  Busboy = require('busboy'),
  connectb = require('connect-busboy'),
  config = require('../../config/environment'),
  fs = require('fs');


// GetErrorMessage
var getErrorMessage = function(err) {
  if(err.errors) {
    for (var errName in err.errors) {
      if(err.errors[errName].message)
        return err.errors[errName].message;

    }
  } else {
    return 'Unknown server error';
  }
};

// Get list of posts
exports.index = function(req, res) {
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.json(200, posts);
  });
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    return res.json(post);
  });
};

// Creates a new post in the DB.
exports.create = function(req, res) {

   var post = new Post(req.body);

  post.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.postById = function(req, res,next,id) {
  Post.findById(id).exec(
    function(err, post){
      if (err) return next(err);
      if(!post) return next(new Error('Failed to load post' + id));

      req.post = post;
      next();
    });
};

exports.upload = function(req, res) {
  var busboy = new Busboy({ headers: req.headers});
  var publicfolder = 'client/assets/images/uploads';
  var fileName ='';
  busboy.on('file', function(fieldname, file, filename,encoding, mimetype) {
    var saveTo = path.join(config.root, publicfolder,
      path.basename(fieldname));

    fileName = filename;
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function() {
    var imagePath = path.join(config.root,publicfolder, fileName);
    return res.json(200, JSON.parse('{"path":"' + imagePath + '"}'))
  });
}
function handleError(res, err) {
  return res.send(500, err);
}



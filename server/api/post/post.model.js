'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  date: Date,
  tags: [],
  content: String,
  slug: String,
  updated: Date,
  excerpt: String,
  categories: [],
  comments: Boolean,
  layout: String,
  link : String,
  published: Boolean
});

module.exports = mongoose.model('Post', PostSchema);

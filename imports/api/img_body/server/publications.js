import { Meteor } from 'meteor/meteor';
import { Img_body } from '../img_body.js';

Meteor.publish('img.body', function () {
  return Img_body.find();
});
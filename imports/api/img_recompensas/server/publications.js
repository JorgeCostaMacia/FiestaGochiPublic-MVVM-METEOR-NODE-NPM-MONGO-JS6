import { Meteor } from 'meteor/meteor';
import { Img_recompensas } from '../img_recompensas.js';

Meteor.publish('img.recompensas', function () {
  return Img_recompensas.find();
});
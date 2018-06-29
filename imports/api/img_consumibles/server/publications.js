import { Meteor } from 'meteor/meteor';
import { Img_consumibles } from '../img_consumibles.js';

Meteor.publish('img.consumibles', function () {
  return Img_consumibles.find();
});
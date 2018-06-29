import { Meteor } from 'meteor/meteor';
import { Img_personajes } from '../img_personajes.js';

Meteor.publish('img.personajes', function () {
  return Img_personajes.find();
});
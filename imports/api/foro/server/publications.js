import { Meteor } from 'meteor/meteor';
import { Foro } from '../foro.js';

Meteor.publish('foro', function () {
  return Foro.find();
});

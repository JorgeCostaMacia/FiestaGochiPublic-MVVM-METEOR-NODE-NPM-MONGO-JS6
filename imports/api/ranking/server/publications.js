import { Meteor } from 'meteor/meteor';
import { Rankings } from '../ranking.js';

Meteor.publish('rankings', function () {
  return Rankings.find();
});
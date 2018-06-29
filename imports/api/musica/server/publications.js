import { Meteor } from 'meteor/meteor';
import { Musica } from '../musica.js';

Meteor.publish('musica', function () {
  return Musica.find();
});

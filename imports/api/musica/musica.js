import { Mongo } from 'meteor/mongo';

/*
* canal = {
*   _id
*   nombre
*   url
*   date
* }
*/

export const Musica = new Mongo.Collection('musica');

import { Mongo } from 'meteor/mongo';

/*
*   video = {
*       _id
*       nombre
*       url
*       jugadores
*       date
*   }
*/

export const Videos = new Mongo.Collection('videos');
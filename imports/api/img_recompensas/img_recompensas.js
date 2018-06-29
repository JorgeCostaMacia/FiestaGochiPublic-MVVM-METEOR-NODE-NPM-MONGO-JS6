import { Mongo } from 'meteor/mongo';

/*
* img_recompensas = {
*   _id
*   nombre
*   alt
*   url
* }
*/

export const Img_recompensas = new Mongo.Collection('img_recompensas');

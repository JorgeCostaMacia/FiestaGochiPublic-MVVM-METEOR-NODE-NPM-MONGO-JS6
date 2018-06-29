import { Mongo } from 'meteor/mongo';

/*
* img_consumibles = {
*   _id
*   nombre
*   alt
*   url
* }
*/

export const Img_consumibles = new Mongo.Collection('img_consumibles');

import { Mongo } from 'meteor/mongo';

/*
* img_body = {
*   _id
*   nombre
*   alt
*   url
* }
*/

export const Img_body = new Mongo.Collection('img_body');

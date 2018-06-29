import { Mongo } from 'meteor/mongo';

/*
* img_personaje = {
*   _id
*   nombre
*   alt
*   url_png
*   url_gif
*   url_carrousel
* }
*/

export const Img_personajes = new Mongo.Collection('img_personajes');

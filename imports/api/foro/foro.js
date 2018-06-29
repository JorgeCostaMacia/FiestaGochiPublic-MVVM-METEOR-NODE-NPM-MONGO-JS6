import { Mongo } from 'meteor/mongo';

/*
* mensaje = {
*   _id
*   id_usuario
*   nick
*   date
*   mensaje
* }
*/

export const Foro = new Mongo.Collection('foro');

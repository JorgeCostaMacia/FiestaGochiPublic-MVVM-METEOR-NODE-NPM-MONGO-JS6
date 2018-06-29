import { Mongo } from 'meteor/mongo';

/*
* ranking = {
*   _id
*   id_usuario
*   lvl
*   puntos
*   nick
* }
*/

export const Rankings = new Mongo.Collection('rankings');
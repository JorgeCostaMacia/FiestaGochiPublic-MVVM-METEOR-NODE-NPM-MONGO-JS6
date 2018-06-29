import { Mongo } from 'meteor/mongo';

/*
* partida = {
*   _id
*   id_usuario
*   lvl
*   personaje
*   stats = {
*       energia
*       alegria
*       sed
*       cansancio
*   }
*   consumibles = {
*       bizcocho_risa
*       gyn_tonic
*       caramelo_energetico
*       recarga
*   }
* }
*/

export const Partidas = new Mongo.Collection('partidas');

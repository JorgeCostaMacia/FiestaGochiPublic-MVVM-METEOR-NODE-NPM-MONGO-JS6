import {Mongo} from "meteor/mongo";

/*
* log_users = {
*   _id
*   action
*   route_name
*   id_usuario
*   date
*   geolocation
* }
*/

export const Log_users = new Mongo.Collection('log_users');

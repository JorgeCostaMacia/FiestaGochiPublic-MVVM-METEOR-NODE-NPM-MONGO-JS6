import {Mongo} from "meteor/mongo";

/*
* log_server = {
*   _id
*   action
*   date
* }
*/

export const Log_server = new Mongo.Collection('log_server');

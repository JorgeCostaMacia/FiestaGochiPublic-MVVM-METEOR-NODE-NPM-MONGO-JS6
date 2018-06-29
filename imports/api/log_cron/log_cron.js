import {Mongo} from "meteor/mongo";

/*
* log_cron = {
*   _id
*   action
*   date
* }
*/

export const Log_cron = new Mongo.Collection('log_cron');

import {Mongo} from "meteor/mongo";

/*
* log_api_error = {
*   _id
*   api
*   action
*   date
*   error
* }
*/

export const Log_api_error = new Mongo.Collection('log_api_error');

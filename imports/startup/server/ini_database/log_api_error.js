import {Meteor} from "meteor/meteor";
import {Log_api_error} from "../../../api/log_api_error/log_api_error";
import moment from 'moment';

Meteor.startup(() => {
    if(Log_api_error.find().count() === 0){
        Log_api_error.insert({
            api: 'none',
            action: 'start_server',
            date: moment().format('YYYY-MM-DD, HH:mm:ss'),
            error: 'none'
        });
    }
});
import './msj_foro.html';

import {Template} from "meteor/templating";
import { Foro } from '/imports/api/foro/foro.js';
import moment from 'moment';

Template.Msj_foro.onCreated(function () {
    Session.set('equals', []);
});

Template.Msj_foro.helpers({
    mensajes: function(){
        let equals = [];

        if(Session.get('camp') === "nick"){
            _.forEach(Foro.find({}).fetch(), function (value,index) {
                if (value.nick.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Foro.find({_id: {$in: equals} }, {sort: {nick: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "date"){
            _.forEach(Foro.find({}).fetch(), function (value,index) {
                if (value.date.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Foro.find({_id: {$in: equals}}, {sort: {date: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
        else if(Session.get('camp') === "msj"){
            _.forEach(Foro.find({}).fetch(), function (value,index) {
                if (value.mensaje.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Foro.find({_id: {$in: equals}}, {sort: {mensaje: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
        }
    },
    formatDate: function(date){
        return moment(date, 'YYYY-MM-DD, HH:mm:ss').fromNow();
    }
});
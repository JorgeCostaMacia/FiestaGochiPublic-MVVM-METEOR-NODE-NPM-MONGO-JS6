import './puntuacion_ranking.html';

import {Template} from "meteor/templating";
import { Rankings } from '/imports/api/ranking/ranking.js';

Template.Puntuacion_ranking.onCreated(function () {
    Session.set('equals', []);
});

Template.Puntuacion_ranking.helpers({
    puntuacion(){
        let equals = [];

        if(Session.get('camp') === "puntos"){
            _.forEach(Rankings.find({}).fetch(), function (value,index) {
                if (value.puntos.toString().indexOf(Session.get('textSearch').toUpperCase()) >= 0 ) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Rankings.find({_id: {$in: equals}}, {sort: {puntos: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
         }
         else if(Session.get('camp') === "lvl"){
            _.forEach(Rankings.find({}).fetch(), function (value,index) {
                if (value.lvl.toString().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Rankings.find({_id: {$in: equals}}, {sort: {lvl: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
         }
         else if(Session.get('camp') === "nick"){
            _.forEach(Rankings.find({}).fetch(), function (value,index) {
                if (value.nick.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                    equals.push(value._id);
                }
            });

            Session.set('equals', equals);

            return Rankings.find({_id: {$in: equals}}, {sort: {nick: Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10 });
         }
    }
});
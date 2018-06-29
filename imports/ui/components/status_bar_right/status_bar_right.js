import './status_bar_right.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Partidas } from '/imports/api/partidas/partidas.js';
import {Img_recompensas} from "../../../api/img_recompensas/img_recompensas.js";

Template.Status_bar_right.helpers({
    energia(){
        if(Session.get('partidasSub') === "ready" && Meteor.user()) {
            return Partidas.findOne({_id: Meteor.userId()}).stats.energia;
        }
    },
    existRecarga(){
        return Session.get('partidasSub') === "ready" && Meteor.user() && Partidas.findOne({_id: Meteor.userId()}).consumibles.recarga === 1;
    },
    existJuego() {
        return Session.get('partidasSub') === "ready" && Meteor.user() && Partidas.findOne({_id: Meteor.userId()}).stats.energia >= 80;
    },
    existDos(){
        if(Session.get('partidasSub') === "ready" && Meteor.user()) {
            if(Partidas.findOne({_id: Meteor.userId()}).consumibles.recarga > 0 && Partidas.findOne({_id: Meteor.userId()}).stats.energia >= 80){
                return 'col-sm-6 col-xs-6';
            }
            else {
                return 'col-sm-12 col-xs-12';
            }
        }
    },
    imgDaleGas(){
        if(Session.get('imgRecoSub') === "ready") {
            return Img_recompensas.findOne({_id: "daleGas"});
        }
    },
    imgRecarga(){
        if(Session.get('imgRecoSub') === "ready") {
            return Img_recompensas.findOne({_id: "recarga"});
        }
    }
});

Template.Status_bar_right.events({
    'click #daleGas': function(){
        if(Partidas.findOne({_id: Meteor.userId()}).stats.energia >= 80){
            FlowRouter.go('/juego');
        }
    },
    'click #recarga': function(){
        if(Partidas.findOne({_id: Meteor.userId()}).consumibles.recarga > 0){
            $('.consu_gyn').animate({  borderSpacing: -720 }, {
                step: function(now,fx) {
                    $(this).css('-webkit-transform','rotate('+now+'deg)');
                    $(this).css('-moz-transform','rotate('+now+'deg)');
                    $(this).css('transform','rotate('+now+'deg)');
                },
                duration:'slow'
            },'linear');
            $('.consu_bizcocho').animate({  borderSpacing: -720 }, {
                step: function(now,fx) {
                    $(this).css('-webkit-transform','rotate('+now+'deg)');
                    $(this).css('-moz-transform','rotate('+now+'deg)');
                    $(this).css('transform','rotate('+now+'deg)');
                },
                duration:'slow'
            },'linear');
            $('.consu_caramelo').animate({  borderSpacing: -720 }, {
                step: function(now,fx) {
                    $(this).css('-webkit-transform','rotate('+now+'deg)');
                    $(this).css('-moz-transform','rotate('+now+'deg)');
                    $(this).css('transform','rotate('+now+'deg)');
                },
                duration:'slow'
            },'linear');
            Meteor.call('partidas.recarga', function (err, res) {
                if(err){
                    Msj_modal.open_danger('Se produjo un error y no se pudo usar');
                }
            });
        }
    }
});
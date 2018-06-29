import './status_bar_left.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import { Partidas } from '/imports/api/partidas/partidas.js';
import { Img_consumibles } from '/imports/api/img_consumibles/img_consumibles.js';

Template.Status_bar_left.helpers({
    consumibles(){
        if(Session.get('partidasSub') === "ready" && Meteor.user()) {
            return Partidas.findOne({_id: Meteor.userId()}).consumibles;
        }
    },
    stats(){
        if(Session.get('partidasSub') === "ready" && Meteor.user()) {
            return Partidas.findOne({_id: Meteor.userId()}).stats;
        }
    },
    imgGyn(){
        if(Session.get('imgConsuSub') === "ready") {
           return Img_consumibles.findOne({_id: "gyn"});
       }
    },
    imgBizcocho(){
        if(Session.get('imgConsuSub') === "ready") {
            return Img_consumibles.findOne({_id: "bizcocho"});
        }
    },
    imgCaramelo(){
        if(Session.get('imgConsuSub') === "ready") {
            return Img_consumibles.findOne({_id: "caramelo"});
        }
    },
});

Template.Status_bar_left.events({
    'click .consu_gyn': function(e){
        $('.consu_gyn').animate({  borderSpacing: -720 }, {
            step: function(now,fx) {
                $(this).css('-webkit-transform','rotate('+now+'deg)');
                $(this).css('-moz-transform','rotate('+now+'deg)');
                $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'slow'
        },'linear');

        if(Partidas.findOne({_id: Meteor.userId()}).consumibles.gyn_tonic !== 0) {
            Meteor.call('partidas.usarGynTonic', function (err, res) {
                if (err) {
                    Msj_modal.open_danger('Se produjo un error y no se pudo usar');
                }
            });
        }
    },

    'click .consu_bizcocho': function(e){
        $('.consu_bizcocho').animate({  borderSpacing: -720 }, {
            step: function(now,fx) {
                $(this).css('-webkit-transform','rotate('+now+'deg)');
                $(this).css('-moz-transform','rotate('+now+'deg)');
                $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'slow'
        },'linear');

        if(Partidas.findOne({_id: Meteor.userId()}).consumibles.bizcocho_risa !== 0){
            Meteor.call('partidas.usarBizcochoRisa', function (err, res) {
                if(err){
                    Msj_modal.open_danger('Se produjo un error y no se pudo usar');
                }
            });
        }
    },
    'click .consu_caramelo': function(e){
        $('.consu_caramelo').animate({  borderSpacing: -720 }, {
            step: function(now,fx) {
                $(this).css('-webkit-transform','rotate('+now+'deg)');
                $(this).css('-moz-transform','rotate('+now+'deg)');
                $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'slow'
        },'linear');

        if(Partidas.findOne({_id: Meteor.userId()}).consumibles.caramelo_energetico !== 0){
            Meteor.call('partidas.usarCarameloEnergetico', function (err, ress) {
                if(err){
                    Msj_modal.open_danger('Se produjo un error y no se pudo usar');
                }
            });
        }
    }
});
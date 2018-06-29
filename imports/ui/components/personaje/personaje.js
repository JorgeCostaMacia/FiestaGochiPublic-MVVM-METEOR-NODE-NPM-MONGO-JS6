import './personaje.html';

import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Partidas } from '/imports/api/partidas/partidas.js';
import {Img_personajes} from "../../../api/img_personajes/img_personajes";
import {Meteor} from "meteor/meteor";

Template.Personaje.helpers({
    personajePath(){
        if(Session.get('partidasSub') === "ready" && Session.get('imgPersonajes') === 'ready' && Meteor.user()){
            if(Img_personajes.findOne(Partidas.findOne({_id: Meteor.userId()}).personaje)){
                if(FlowRouter.getRouteName() === 'Route.home') {
                    return Img_personajes.findOne(Partidas.findOne({_id: Meteor.userId()}).personaje).url_png;
                }
                else {
                    return Img_personajes.findOne(Partidas.findOne({_id: Meteor.userId()}).personaje).url_gif;
                }
            }
            else {
                if(FlowRouter.getRouteName() === 'Route.home') {
                    return Img_personajes.findOne().url_png;
                }
                else {
                    return Img_personajes.findOne().url_gif;
                }
            }
        }
    },
    personajeAlt(){
        if(Session.get('partidasSub') === "ready" && Session.get('imgPersonajes') === 'ready' && Meteor.user()){
            if(Img_personajes.findOne(Partidas.findOne({_id: Meteor.userId()}).personaje)) {
                return Img_personajes.findOne(Partidas.findOne({_id: Meteor.userId()}).personaje).alt;
            }
            else {
                return Img_personajes.findOne().alt;
            }
        }
    },
    size(){
        if(FlowRouter.getRouteName() === 'Route.home'){
            return 'col-lg-6 col-md-6 col-sm-12 col-xs-12';
        }
        else{
            return 'col-lg-10 col-md-10 col-sm-8 col-xs-8';
        }
    }
});
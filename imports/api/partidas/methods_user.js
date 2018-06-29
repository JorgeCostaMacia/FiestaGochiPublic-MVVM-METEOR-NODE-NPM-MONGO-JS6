import { Meteor } from 'meteor/meteor';
import {Email} from "meteor/email";
import { Partidas } from './partidas.js';
import {EmailTemplates} from "/imports/ui/components/email_body/email_body.js";
import {Parametros} from "../parametros/parametros";
import {Log_api_error} from "../log_api_error/log_api_error";
import {Img_personajes} from "../img_personajes/img_personajes";
import moment from 'moment';

Meteor.methods({
    'partidas.crear': function(id_usuario) {
        try {
            Partidas.insert({
                _id: id_usuario,
                lvl: 1,
                personaje: Img_personajes.findOne()._id,
                stats: {energia: 100, alegria: 100, sed: 100, cansancio: 100},
                consumibles: {bizcocho_risa: 10, gyn_tonic: 10, caramelo_energetico: 10, recarga: 1}
            });
         }
         catch (err) {
             let errDoc = {
                 api: 'partidas',
                 action: 'partidas.crear',
                 date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                 error: err
             };

             errDoc._id = Log_api_error.insert(errDoc);

             Email.send({
                 to: 'suportfiestagochi@gmail.com',
                 from: 'FiestaGochi <fiestagochi@gmail.com>',
                 subject: 'Error ' + errDoc._id,
                 html: EmailTemplates.errorBody(errDoc)
             });

             throw err;
         }
    },
    'partidas.cambiarPj': function(pj){
        if(Meteor.user()) {
            try {
                if (Meteor.user()) {
                    Partidas.update(Meteor.userId(), {$set: {personaje: pj}});
                }
            }
            catch (err) {
                let errDoc = {
                    api: 'partidas',
                    action: 'partidas.cambiarPj',
                    date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                    error: err
                };

                errDoc._id = Log_api_error.insert(errDoc);

                Email.send({
                    to: 'suportfiestagochi@gmail.com',
                    from: 'FiestaGochi <fiestagochi@gmail.com>',
                    subject: 'Error ' + errDoc._id,
                    html: EmailTemplates.errorBody(errDoc)
                });

                throw err;
            }
        }
    },
    'partidas.reset': function(){
        if(Meteor.user()) {
            try {
                Partidas.update(Meteor.userId(),
                    {
                        $set: {
                            lvl: 1,
                            consumibles: {
                                gyn_tonic: 10,
                                bizcocho_risa: 10,
                                caramelo_energetico: 10,
                                recarga: 1
                            },
                            stats: {
                                sed: 100,
                                alegria: 100,
                                cansancio: 100,
                                energia: 100
                            }
                        }
                    }
                );
            }
            catch (err) {
                let errDoc = {
                    api: 'partidas',
                    action: 'partidas.reset',
                    date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                    error: err
                };

                errDoc._id = Log_api_error.insert(errDoc);

                Email.send({
                    to: 'suportfiestagochi@gmail.com',
                    from: 'FiestaGochi <fiestagochi@gmail.com>',
                    subject: 'Error ' + errDoc._id,
                    html: EmailTemplates.errorBody(errDoc)
                });

                throw err;
            }
        }
    },
    'partidas.usarGynTonic': function(){
        if(Meteor.user()) {
            try {
                let consuUpdate = Partidas.findOne({_id: Meteor.userId()}).consumibles;
                let statsUpdate = Partidas.findOne({_id: Meteor.userId()}).stats;
                let parametros = Parametros.findOne({_id: 'partida'});

                if (consuUpdate.gyn_tonic > 0) {
                    consuUpdate.gyn_tonic -= 1;
                    statsUpdate.sed += parametros.statsMas50;

                    if (statsUpdate.sed > 100) {
                        statsUpdate.sed = 80;
                        statsUpdate.energia -= parametros.statsMas100;
                    }
                    else if (statsUpdate.sed > 50 && statsUpdate.alegria > 50 && statsUpdate.cansancio > 50) {
                        statsUpdate.energia += parametros.statsMas50;
                    }
                    if (statsUpdate.energia > 100) {
                        statsUpdate.energia = 100;
                    }

                    Partidas.update(Meteor.userId(), {$set: {consumibles: consuUpdate, stats: statsUpdate}});
                }
            }
            catch (err) {
                let errDoc = {
                    api: 'partidas',
                    action: 'partidas.usarGynTonic',
                    date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                    error: err
                };

                errDoc._id = Log_api_error.insert(errDoc);

                Email.send({
                    to: 'suportfiestagochi@gmail.com',
                    from: 'FiestaGochi <fiestagochi@gmail.com>',
                    subject: 'Error ' + errDoc._id,
                    html: EmailTemplates.errorBody(errDoc)
                });

                throw err;
            }
        }
    },
    'partidas.usarBizcochoRisa': function(){
        if(Meteor.user()) {
            try {
                let consuUpdate = Partidas.findOne({_id: Meteor.userId()}).consumibles;
                let statsUpdate = Partidas.findOne({_id: Meteor.userId()}).stats;
                let parametros = Parametros.findOne({_id: 'partida'});

                if (consuUpdate.bizcocho_risa > 0) {
                    consuUpdate.bizcocho_risa -= 1;
                    statsUpdate.alegria += parametros.statsMas50;

                    if (statsUpdate.alegria > 100) {
                        statsUpdate.alegria = 80;
                        statsUpdate.energia -= parametros.statsMas100;
                    }
                    else if (statsUpdate.sed > 50 && statsUpdate.alegria > 50 && statsUpdate.cansancio > 50) {
                        statsUpdate.energia += parametros.statsMas50;
                    }
                    if (statsUpdate.energia > 100) {
                        statsUpdate.energia = 100;
                    }

                    Partidas.update(Meteor.userId(), {$set: {consumibles: consuUpdate, stats: statsUpdate}});
                }
            }
            catch (err) {
                let errDoc = {
                    api: 'partidas',
                    action: 'partidas.usarBizcochoRisa',
                    date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                    error: err
                };

                errDoc._id = Log_api_error.insert(errDoc);

                Email.send({
                    to: 'suportfiestagochi@gmail.com',
                    from: 'FiestaGochi <fiestagochi@gmail.com>',
                    subject: 'Error ' + errDoc._id,
                    html: EmailTemplates.errorBody(errDoc)
                });

                throw err;
            }
        }
    },
    'partidas.usarCarameloEnergetico': function(){
        if(Meteor.user()) {
            try {
                let consuUpdate = Partidas.findOne({_id: Meteor.userId()}).consumibles;
                let statsUpdate = Partidas.findOne({_id: Meteor.userId()}).stats;
                let parametros = Parametros.findOne({_id: 'partida'});

                if (consuUpdate.caramelo_energetico > 0) {
                    consuUpdate.caramelo_energetico -= 1;
                    statsUpdate.cansancio += parametros.statsMas50;

                    if (statsUpdate.cansancio > 100) {
                        statsUpdate.cansancio = 80;
                        statsUpdate.energia -= parametros.statsMas100;
                    }
                    else if (statsUpdate.sed > 50 && statsUpdate.alegria > 50 && statsUpdate.cansancio > 50) {
                        statsUpdate.energia += parametros.statsMas50;
                    }
                    if (statsUpdate.energia > 100) {
                        statsUpdate.energia = 100;
                    }

                    Partidas.update(Meteor.userId(), {$set: {consumibles: consuUpdate, stats: statsUpdate}});
                }
            }
            catch (err) {
                let errDoc = {
                    api: 'partidas',
                    action: 'partidas.usarCarameloEnergetico',
                    date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                    error: err
                };

                errDoc._id = Log_api_error.insert(errDoc);

                Email.send({
                    to: 'suportfiestagochi@gmail.com',
                    from: 'FiestaGochi <fiestagochi@gmail.com>',
                    subject: 'Error ' + errDoc._id,
                    html: EmailTemplates.errorBody(errDoc)
                });

                throw err;
            }
        }
    },
    'partidas.jugar': function(){
        if(Meteor.user()) {
            try {
                let statsUpdate = Partidas.findOne({_id: Meteor.userId()}).stats;
                let parametros = Parametros.findOne({_id: 'partida'});

                statsUpdate.alegria -= parametros.jugarStats;
                statsUpdate.sed -= parametros.jugarStats;
                statsUpdate.cansancio -= parametros.jugarStats;
                statsUpdate.energia -= parametros.jugarEnergia;
                Partidas.update(Meteor.userId(), {$set: {stats: statsUpdate}});
            }
            catch (err) {
                let errDoc = {
                    api: 'partidas',
                    action: 'partidas.jugar',
                    date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                    error: err
                };

                errDoc._id = Log_api_error.insert(errDoc);

                Email.send({
                    to: 'suportfiestagochi@gmail.com',
                    from: 'FiestaGochi <fiestagochi@gmail.com>',
                    subject: 'Error ' + errDoc._id,
                    html: EmailTemplates.errorBody(errDoc)
                });

                throw err;
            }
        }
    },
    'partidas.recarga': function(){
        if(Meteor.user()) {
            try {
                let consuUpdate = Partidas.findOne({_id: Meteor.userId()}).consumibles;
                let parametros = Parametros.findOne({_id: 'partida'});

                if (consuUpdate.recarga > 0) {
                    consuUpdate.recarga -= 1;
                    consuUpdate.bizcocho_risa += parametros.consuRecarga;
                    consuUpdate.gyn_tonic += parametros.consuRecarga;
                    consuUpdate.caramelo_energetico += parametros.consuRecarga;
                    Partidas.update(Meteor.userId(), {$set: {consumibles: consuUpdate}});
                }
            }
            catch (err) {
                let errDoc = {
                    api: 'partidas',
                    action: 'partidas.recarga',
                    date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                    error: err
                };

                errDoc._id = Log_api_error.insert(errDoc);

                Email.send({
                    to: 'suportfiestagochi@gmail.com',
                    from: 'FiestaGochi <fiestagochi@gmail.com>',
                    subject: 'Error ' + errDoc._id,
                    html: EmailTemplates.errorBody(errDoc)
                });

                throw err;
            }
        }
    }
});
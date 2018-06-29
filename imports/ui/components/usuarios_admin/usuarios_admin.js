import './usuarios_admin.html';

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import moment from 'moment';

Template.Usuarios_admin.onCreated(function () {
    Session.set('equals', []);
});

Template.Usuarios_admin.helpers({
    usuarios() {
        if(Session.get('usuariosSub') === "ready"){
            let equals = [];

            if (Session.get('camp') === "nick") {
                _.forEach(Meteor.users.find({}).fetch(), function (value, index) {
                    if (value.profile.roles === "user" && value.username.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                        equals.push(value._id);
                    }
                });

                Session.set('equals', equals);

                return Meteor.users.find({_id: {$in: equals}}, {
                    sort: {username: Session.get('order')},
                    skip: Session.get('pageActual') * 10,
                    limit: 10
                });
            }
            else if (Session.get('camp') === "email") {
                _.forEach(Meteor.users.find({}).fetch(), function (value, index) {
                    if (value.profile.roles === "user" && value.emails[0].address.toUpperCase().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                        equals.push(value._id);
                    }
                });

                Session.set('equals', equals);

                return Meteor.users.find({_id: {$in: equals}}, {sort: {'emails.0.address': Session.get('order')}, skip: Session.get('pageActual') * 10, limit: 10});
            }
            else if (Session.get('camp') === "creacion") {
                _.forEach(Meteor.users.find({}).fetch(), function (value, index) {
                    if (value.profile.roles === "user" && value.createdAt.toString().indexOf(Session.get('textSearch').toUpperCase()) >= 0) {
                        equals.push(value._id);
                    }
                });

                Session.set('equals', equals);

                return Meteor.users.find({_id: {$in: equals}}, {
                    sort: {createdAt: Session.get('order')},
                    skip: Session.get('pageActual') * 10,
                    limit: 10
                });
            }
        }
    },
    email(userDoc){
        return userDoc.emails[0].address;
    },
    verificado(userDoc){
        return userDoc.emails[0].verified === true;
    },
    avisosNo(userDoc){
        if(userDoc.profile.avisos === "No recibir"){
            return 'selected';
        }
    },
    avisosSi(userDoc){
        if(userDoc.profile.avisos === "Recibir"){
            return 'selected';
        }
    },
    formatDate(date){
        let aux = moment(date).format('YYYY-MM-DD, HH:mm:ss').split(',');
        let dateAux = aux[0].split('-');

        return dateAux[2] + '-' + dateAux[1] + '-' + dateAux[0] + ' ' + aux[1];
    }
});

Template.Usuarios_admin.events({
    'click .borrar_usuario': function(e){
        e.preventDefault();

        Meteor.call('users.admin_remove', this._id, function (err, res) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo borrar');
            }
            else {
                Msj_modal.open_success("Se ha borrado correctamente");
            }
        });
    },
    'submit .form_usuario': function(e){
        e.preventDefault();

        let doc_user = this;

        doc_user.username = $('.nick', e.target).val();
        doc_user.emails[0].address = $('.email', e.target).val();
        doc_user.profile.avisos = $('.avisos', e.target).val();

        Meteor.call('users.admin_update', doc_user, function (err, res) {
            if(err){
                if (err.reason === "Username already exists.") {
                    Msj_modal.open_danger("Ya existe un usuario con ese nick");
                }
                else if (err.reason === "Email already exists.") {
                    Msj_modal.open_danger("Ya existe un usuario con ese email");
                }
                else {
                    Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
                }
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});
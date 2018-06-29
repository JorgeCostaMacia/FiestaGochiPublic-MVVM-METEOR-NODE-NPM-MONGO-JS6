import './cron_admin.html';

import {Parametros} from "../../../api/parametros/parametros.js";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Meteor} from "meteor/meteor";

Template.Cron_admin.helpers({
    cron(){
        if(Session.get('cronSub') === "ready" && Meteor.user()){
            return Parametros.findOne({_id: 'cron'});
        }
    }
});

Template.Cron_admin.events({
    'submit #form_cron': function (e) {
        e.preventDefault();

        let doc_cron = {};
        doc_cron.interval = 1 * $('#interval').val();
        doc_cron.interval_stats = 1 * $('#interval_stats').val();
        doc_cron.interval_consumibles = 1 * $('#interval_consumibles').val();
        doc_cron.menosUno50 = 1 * $('#menosUno50').val();
        doc_cron.menosDos50 = 1 * $('#menosDos50').val();
        doc_cron.menosTres50 = 1 * $('#menosTres50').val();
        doc_cron.menosUno30 = 1 * $('#menosUno30').val();
        doc_cron.menosDos30 = 1 * $('#menosDos30').val();
        doc_cron.menosTres30 = 1 * $('#menosTres30').val();
        doc_cron.menosStats = 1 * $('#menosStats').val();
        
        Meteor.call('parametros.admin_cron_update', doc_cron, function (err,ress) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});


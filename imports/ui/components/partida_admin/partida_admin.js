import './partida_admin.html';

import {Parametros} from "../../../api/parametros/parametros.js";
import {Msj_modal} from "../msj_modal/msj_modal";

Template.Partida_admin.helpers({
    partida(){
        if(Session.get('parPartidaSub') === "ready" && Meteor.user()){
            return Parametros.findOne({_id: 'partida'});
        }
    }
});

Template.Partida_admin.events({
    'submit #form_partida': function (e) {
        e.preventDefault();

        let doc_partida = {};
        doc_partida.statsMas100 = 1 * $('#statsMas100').val();
        doc_partida.statsMas50 = 1 * $('#statsMas50').val();
        doc_partida.consuRecarga = 1 * $('#consuRecarga').val();
        doc_partida.jugarStats = 1 * $('#jugarStats').val();
        doc_partida.jugarEnergia = 1 * $('#jugarEnergia').val();

        Meteor.call('parametros.admin_partida_update', doc_partida, function (err,ress) {
            if(err){
                Msj_modal.open_danger('Se produjo un error y no se pudo guardar');
            }
            else {
                Msj_modal.open_success("Se ha modificado correctamente");
            }
        });
    }
});


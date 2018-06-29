import './msj_modal.html';

import { Template } from 'meteor/templating';

Template.Msj_modal.helpers({
    msjType: function () { return Session.get('msjType');},
    msjText: function () { return Session.get('msjText');},
});

export const Msj_modal = {
    open_danger(text){
        Session.set('msjType', 'danger');
        Session.set('msjText', text);
        $("#msj_modal").modal("show");
    },
    open_warning(text){
        Session.set('msjType', 'warning');
        Session.set('msjText', text);
        $("#msj_modal").modal("show");
    },
    open_success(text){
        Session.set('msjType', 'success');
        Session.set('msjText', text);
        $("#msj_modal").modal("show");
    },
    open_info(text){
        Session.set('msjType', 'info');
        Session.set('msjText', text);
        $("#msj_modal").modal("show");
    },
    close(){
        $("#msj_modal").modal('hide');
    }
};
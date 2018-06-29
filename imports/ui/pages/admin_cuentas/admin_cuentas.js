import './admin_cuentas.html';
import '/imports/ui/components/nav_home/nav_home.js';
import '/imports/ui/components/form_usuario/form_usuario.js';
import '/imports/ui/components/order_admin_usuarios/order_admin_usuarios.js';
import '/imports/ui/components/buscador/buscador.js';
import '/imports/ui/components/usuarios_admin/usuarios_admin.js';
import '/imports/ui/components/pagination_admin_usuarios/pagination_admin_usuarios.js';

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";

Template.Page_admin_cuentas.onCreated(
    function(){
        Meteor.subscribe('musica', function(){
            Session.set('musicaSub', 'ready');
        });
        Meteor.subscribe('usuarios.admin', function(){
            Session.set('usuariosSub', 'ready');
        });
    }
);
import {Accounts} from "meteor/accounts-base";
import moment from 'moment';
import 'moment/locale/es';
import 'moment-timezone';
import {Msj_modal} from "../../ui/components/msj_modal/msj_modal";

delete Accounts._accountsCallbacks['verify-email'];

moment.tz.setDefault('Europe/Madrid');
moment.locale('es');

window.oncontextmenu = function () {
    Msj_modal.open_info('Esa opción ha sido desactivada por motivos de seguridad');

    return false;
};
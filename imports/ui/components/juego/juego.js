import {Meteor} from "meteor/meteor";
import {Msj_modal} from "../msj_modal/msj_modal";
import {Parametros} from "../../../api/parametros/parametros";
import {Partidas} from "../../../api/partidas/partidas";

export const Juego = {
    color: ['deepskyblue', 'greenyellow', 'deeppink', 'mediumspringgreen'],
    position: ['arriba', 'derecha', 'abajo', 'izquierda'],
    keysASDW: [119, 100, 115, 97], // A = 97    D = 100     w = 119     S = 115
    keysJKLI: [105, 108, 107, 106], // J = 106   L = 108     I = 105     K = 107
    currentPos: "empty",
    currentColor: 5,
    auxColor: 6,
    auxPos: 8,
    puntos: 0,
    puntPasado: 0,
    puntosAcierto: 500,
    puntosFallo: 100,
    interval: 499,
    timeCont: null,

    pageControl: function(){
        return FlowRouter.getRouteName() === 'Route.juego';
    },
    iniPartida: function(){
        let parametrosJuego = Parametros.findOne({_id: 'juego'});
        Juego.color = parametrosJuego.color;
        Juego.puntosAcierto = parametrosJuego.puntosAcierto;
        Juego.puntosFallo = parametrosJuego.puntosFallo;
        Juego.currentPos =  "empty";
        Juego.currentColor = 5;
        Juego.auxColor = 6;
        Juego.auxPos = 8;
        Juego.puntos = 0;
        Juego.interval = parametrosJuego.interval;
        Juego.puntPasado = 0;
        Juego.timeoutInterval = 500;

        setTimeout(function(){
            Msj_modal.open_info("Agárrate los machos que empieza la fiesta en cuanto desaparezca el mensaje<br>Puedes jugar con A S D W - J K L I o haciendo click");
            Meteor.call('partidas.jugar');
            $('html,body').animate({ scrollTop: 9999 }, 'slow');
            Juego.iniDemo();
        },1000);
        setTimeout(function(){
            Juego.iniTimeoutInterval();
            Juego.iniPuntuacion();
            Juego.finDemo();
            Juego.iniJuego();
        },11000);
        setTimeout(function(){
            Juego.finJuego();
        },71000);
    },
    iniTimeoutInterval(){
        let timeoutInterval = 5000 - Partidas.findOne({_id: Meteor.userId()}).lvl * Juego.interval;

        if(timeoutInterval <= 0){
            timeoutInterval = 200;
        }
        Juego.timeoutInterval = timeoutInterval;
    },
    iniPuntuacion :function(){
        let vecesCambio = 61000 / Juego.timeoutInterval;
        Juego.puntPasado = (vecesCambio / 2) * Juego.puntosAcierto;
    },
    getRandomNum: function(){return Math.floor(Math.random() * 4)},
    cleanBackground: function(){
        $('#arriba').css('background', 'transparent');
        $('#derecha').css('background', 'transparent');
        $('#abajo').css('background', 'transparent');
        $('#izquierda').css('background', 'transparent');
        $('#puntuacion').css('background', 'white');
    },
    iniDemo: function(){
        Juego.timeCont = setInterval(
            function(){
                if(!Juego.pageControl()){
                    clearInterval(Juego.timeCont);
                }
                $('#arriba').css('background', Juego.color[Juego.getRandomNum()]);
                $('#derecha').css('background', Juego.color[Juego.getRandomNum()]);
                $('#abajo').css('background', Juego.color[Juego.getRandomNum()]);
                $('#izquierda').css('background', Juego.color[Juego.getRandomNum()]);
            },
            300)},
    finDemo: function(){
        clearInterval(Juego.timeCont);
        Juego.cleanBackground();
        Msj_modal.close();
        Juego.timeCont = null;
    },
    iniJuego: function(){
        Juego.timeCont = setInterval(
            function(){
                if(!Juego.pageControl()){
                    clearInterval(Juego.timeCont);
                }
                Juego.cleanBackground();
                Juego.auxPos = Juego.getRandomNum();
                Juego.currentPos = Juego.auxPos;
                Juego.auxColor = Juego.getRandomNum();
                if(Juego.auxColor !== Juego.currentColor){
                    Juego.auxColor = Juego.getRandomNum();
                }

                $('#' + Juego.position[Juego.auxPos]).css('background', Juego.color[Juego.auxColor]);
            }, Juego.timeoutInterval);
    },
    finJuego: function(){
        clearInterval(Juego.timeCont);
        Juego.cleanBackground();
        if(Juego.pageControl()) {
            if (Juego.puntos >= Juego.puntPasado) {
                Msj_modal.open_success('Eres el amo de la pista<br>Pasas al siguiente nivel');
                Meteor.call('ranking.crear', Juego.puntos,
                    function (err) {
                        FlowRouter.go('/');
                    });
            }
            else {
                Msj_modal.open_danger('He visto pulgas con mas coordinación<br>Vuelve cuando estés preparado');
                FlowRouter.go('/');
            }
        }
    },
    evalInput: function(input){
        if(Juego.currentPos !== "empty"){
            if(input === Juego.keysASDW[Juego.currentPos] || input === Juego.keysJKLI[Juego.currentPos] ){
                Juego.currentPos = 'acertada';
                Juego.puntos += Juego.puntosAcierto;
                $('#puntuacion').text(Juego.puntos);
                $('#puntuacion').css('background', 'green');
            }
            else {
                Juego.puntos -= Juego.puntosFallo;
                $('#puntuacion').text(Juego.puntos);
                $('#puntuacion').css('background', 'red');
            }
        }
    }
};
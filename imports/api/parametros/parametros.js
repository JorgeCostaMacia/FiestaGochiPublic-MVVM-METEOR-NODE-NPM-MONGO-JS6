import { Mongo } from 'meteor/mongo';

/*
* cron = {
*   _id: cron
*   interval
*   interval_stats
*   interval_consumibles
*   menosUno50
*   menosDos50
*   menosTres50
*   menosUno30
*   menosDos30
*   menosTres30
*   menosStats
* }
* juego = {
*   _id: juego
*   color
*   interval
*   puntosAciertos
*   puntosFallo
* }
*
* partida= {
*   _id: partida
*   statsMas100
*   statsMas50
*   consuRecarga
*   jugarStats
*   jugarEnergia
* }
*/

export const Parametros = new Mongo.Collection('parametros');
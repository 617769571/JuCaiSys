/*
 * index.js v0.3.1
 * (c) 2017 wangli
 * Released under the MIT License.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import coms from "./components/";
import { App, Page } from "./app";
var components=[...coms];

const _app = function (_obj,_coms) {
    Vue.use(VueRouter);
    Vue.use(Vuex);
    if(_coms instanceof Array){
        components=components.concat(_coms);
    }
    components.map(component => {
        Vue.component(component.name, component);
    });
    App(Vue, VueRouter,Vuex, _obj);
};
module.exports = {
    v: '0.3',
    Vue:Vue,
    Vuex:Vuex,
    App: _app,
    Page
};
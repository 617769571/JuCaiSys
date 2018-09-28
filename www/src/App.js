import { App } from "vwx";
import pages from './pages/pages';
import store from './store/store';
import config from './config/config';
import exta from './common/exta';
import coms from './components';
import review from './service/review';
import './assets/css/weui.min.css';
import './assets/css/vwx.css';
import './assets/css/css.less';
import VConsole from 'vconsole';

var tpl = '<div id="App">';
tpl += '<keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive><router-view v-if="!$route.meta.keepAlive"></router-view>';
tpl += '</div>';
App({
    exta,
    config,
    store,
    pages,
    tpl,
    onLaunch: function (vm) {
        // 根据url参开启调试面板
        if (A.geturlQs("debuger") == "fky") {
            var vConsole = new VConsole();
            alert(A.geturlQs("token"));
            if (A.geturlQs("token")) alert(A.geturlQs("token"));
        }
    },
    rBefore: function (to, from, next) { 
        next();
    },
    rAfter: function (to) {
        // 更新页面名称，页面title。
        A.store.commit('urlPath', to.name);
    }
}, coms);

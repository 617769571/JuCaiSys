/*
 * app.js v0.6
 * (c) 2017 wangli
 * Released under the MIT License.
 */
/*创建APP根页面*/
import simple from '../common/simple';
import router from './router';
import events from './event';
import _wx from "../wx";
import _ from '../common/babel';
var _router, _appvm, _onLaunch, _store;
var _config = { wxonly: false };
var _app = { ...simple }
events(_app);
Object.defineProperty(_app, "config", {
    get: function () {
        return _config;
    }
})
Object.defineProperty(_app, "view", {
    get: function () {
        return _appvm;
    }
})
Object.defineProperty(_app, "router", {
    get: function () {
        return _router;
    }
})
Object.defineProperty(_app, "store", {
    get: function () {
        return _store;
    }
})

// class app {
//     get config() {
//         return _config;
//     }
//     get view() {
//         return _appvm;
//     }
//     get router() {
//         return _router;
//     }
//     get store() {
//         return _store;
//     }
// }
// _app=new app();
// _.extend(_app,simple);

var App = function (Vue, VueRouter, Vuex, _options) {
    // 路由页面
    if (_options.pages) {
        // 配置路由
        _router = router(VueRouter, _options, _app);
    }
    // 配置扩展
    if (_options.config) {
        Object.assign(_config, _options.config);
    }
    // 开始启动事件
    if (_options.onLaunch) {
        _onLaunch = _options.onLaunch;
    }
    // Vuex数据状态
    if (_options.store) {
        _store = new Vuex.Store(_options.store);
    } else {
        _store = {}
    }
    // 外部自定扩展
    if (_options.exta) {
        let keys = Object.getOwnPropertyNames(_app);
        for (let k in _options.exta) {
            if (keys.find((val) => val == k))
                delete _options.exta[k];
        }
        _.extend(_app, _options.exta);
    }
    // 页面路由容器
    var tpl = '<router-view class="animView"></router-view>';
    if (_options.tpl) {
        tpl = _options.tpl;
    }
    // 是否只运行微信中运行
    if (_config.wxonly && !_wx.iswxbs()) {
        tpl = '<div class="onwx" style="padding: 3rem 2.5rem;text-align: center;"><h2>请在微信中访问</h2></div>';
    }
    // A方法扩展，过滤关键方法
    for (var key in _options) {
        if (key != 'pages' && key != 'config' && key != 'onLaunch' && key != 'view' && key != 'store' && key != 'rBefore' && key != 'rAfter' && key != 'exta' && key != 'tpl') {
            _app[key] = _options[key];
        }
    }
    // 创建页面实例
    if (typeof _appvm == "undefined") {
        _appvm = new Vue({
            name: "App",
            el: '#app',
            store: _store,
            router: _router,
            template: tpl,
            data: {
                history: [],
                animName: "",
                anim: false
            },
            watch: {
                $route(to, from) {
                    if (this.history == 0) {
                        this.history.push(to.path);
                    }
                }
            },
            created: function () {
                this.history.push(this.$route.path);
                console.log("version:" + A.config.c);
                if (_onLaunch) {
                    _onLaunch(this);
                }
            }
        });
    }
};
// 配置全局
if (typeof window !== 'undefined' && typeof window.getApp == 'undefined') {
    window.app = _app;
    window.A = _app;
    window.wx = _wx;
    window.getApp = function () {
        return _app;
    };
    // window.addEventListener("popstate", function (e) {
    //     this.console.log(window.history);
    // }, false);
}

module.exports = App;
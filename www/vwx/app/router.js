// 路由相关控制
// VueRouter：vue-router对象
//_options：App配置传入
module.exports = function (VueRouter, _options, _app) {
    if (typeof _options.pages == 'undefined') return false;
    const _pages = _options.pages;
    // 增加路由返回方法
    VueRouter.prototype.goBack = function () {
        this.isBack = true
        window.history.go(-1)
    }
    // 创建路由
    var _router = new VueRouter({
        //mode: 'history',
        routes: _pages,
        // 切换定位
        scrollBehavior(to, from, savedPosition) {
            if (_options.scroll) _options.scroll;
        }
    });
    // 页面切换之前
    _router.beforeEach((to, from, next) => {
        let _rApp = _router.app;
        if (_options.rBefore) {
            _options.rBefore(to, from, next);
        } else {
            // if (_rApp.$router.isBack) {
            //     _rApp.animName = 'slide-right'
            // } else {
            //     _rApp.animName = 'slide-left'
            // }
            // _rApp.$router.isBack = false

            // 切换动画效果
            if (_rApp.history && _rApp.anim) {
                /*from离开页面处理*/
                var fromChildren = _rApp.$children[0];
                var _sub = _rApp.history.lastIndexOf(to.path);
                // if (_sub < 0) {
                //     _rApp.history.push(to.path);
                //     fromChildren.animName = "animLeft";
                // } else {
                //     _rApp.history.pop();
                //     fromChildren.animName = "animRight";
                // }
                setTimeout(() => { next(); }, 1);
            } else {
                next();
            }
        }
    });
    // 页面切换之后
    _router.afterEach((to, from) => {
        for (let [index, elem] of _options.pages.entries()) {
            if (typeof elem.title == 'undefined') continue;
            if (elem.name == to.name) {
                A.setTitle(elem.title);
                break;
            }
        }
        if (_options.rAfter) {
            if (typeof window !== 'undefined') window.document.getElementsByTagName("body")[0].className = "body_" + to.name;
            _options.rAfter(to);
        }
    });
    return _router;
};
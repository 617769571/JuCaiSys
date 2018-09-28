/*
 * v0.3.1
 * (c) 2017 wangli
 * Released under the MIT License.
 */
/*wx接口*/
import { setStorage, setStorageSync, getStorage, getStorageSync } from "./storage";
//import { showToast, hideToast, showLoading, hideLoading, showModal, showActionSheet } from "./modal";

import weui from "weui.js";
import { navigateTo, redirectTo, navigateBack } from "./navigate";
import wxConfig from "./wxConfig";
import open from "./open";
var _o = {
    v: "0.2.4",
    setStorage,
    setStorageSync,
    getStorage,
    getStorageSync,
    navigateTo,
    redirectTo,
    navigateBack,
    ...wxConfig,
    ...open
};
// weui.js中的loading的全局关闭
var _loading;
var _id = null;
const loading = function (val) {
    closeLoading();
    _loading = new weui.loading(val);
    return _loading;
}
const closeLoading = function () {
    if (_id) {
        clearTimeout(_id);
        _id = null;
    } else {
        _id = setTimeout(() => {
            clearTimeout(_id);
            _id = null;
            if (_loading) weui.topTips('加载数据超时');
            hideLoading();
        }, 18000);
    }
}
// weui.js中的loading的全局关闭
const hideLoading = function () {
    if (_loading) _loading.hide(() => {
        _loading = null;
    });
}
const iswxbs = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
module.exports = { ...weui, loading, hideLoading, iswxbs, ..._o };
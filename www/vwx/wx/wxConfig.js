// 微信公众号网页开发SDK配置
import jwx from 'weixin-js-sdk';
import request from '../common/request';
var _config = {
    debug: false,
    jsApiList: []
};
const config = function (_val) {
    if (_val) {
        Object.assign(_config, _val);
    }
    // 设置配置
    if (_config.jsApiList.length > 0) jwx.config(_config);
    return _config;
}
// 设置配置项
const setjsApiList = function (_val) {
    if (_val instanceof Array) {
        _config['jsApiList'] = _val;
        // 设置配置
        jwx.config(_config);
        return _config['jsApiList'];
    } else if (typeof _val == "string") {
        if (_config['jsApiList'] instanceof Array) {
            if (_config['jsApiList'].find((n) => n == _val) == "undefined") {
                _config['jsApiList'].push(_val);
            }
        } else {
            _config['jsApiList'] = [_val];
        }
        // 设置配置
        jwx.config(_config);
        return _config['jsApiList'];
    }else{
        jwx.config(_config);
    }
}
const rp = function () {
    jwx.config(_config);
}
// 初次地址签名的url保存
var firstUrl = "";
// 获取配置信息
const resConfig = function (_obj) {
    if (_obj.data) {
        firstUrl = _obj.data.url;
    } else {
        _obj.data = { url: firstUrl };
    }
    // _obj配置信息，操作页面的url地址
    return new Promise((resolve, reject) => {
        request.RS(_obj).then(res => {
            resolve(res)
        }, err => {
            reject("获取配置错误")
        })
    })
}
module.exports = { config, setjsApiList, resConfig, rp }

import Axios from 'axios';
import qs from 'qs';
import _ from './babel';
/*
 * v0.2.0
 * (c) 2017 wangli
 * Released under the MIT License.
 */

//发起网络请求
var count = 0;
var _rqData = [];
var _rpData = [];
var rmsg = function () {
    return {
        q: _rqData,
        p: _rpData
    }
}
const hasOwnProperty = Object.prototype.hasOwnProperty
const has = function (object, key) {
    return object != null && hasOwnProperty.call(object, key)
}
const R = _obj => {
    if (typeof _obj.url != "undefined") {
        // 拼接url
        if (_obj.url.indexOf('http://') == -1 && _obj.url.indexOf('https://') == -1) {
            _obj.url = A.config.host + _obj.url;
        }
        _obj["_fail"] = err => { }
        _obj["_success"] = res => { }
        // 获取success方法并处理
        if (typeof _obj.success != "undefined") {
            _obj["_success"] = _obj.success;
            delete _obj.success;
        }
        // 获取fail方法并处理
        if (typeof _obj.fail != "undefined") {
            _obj["_fail"] = _obj.fail;
            delete _obj.fail;
        }

    }
    /*默认参数配置*/
    var _defObj = {};
    _defObj.url = '';
    _defObj.data = {};
    _defObj.wait = true;
    _defObj.method = 'post';
    _defObj.dataType = 'json';
    _defObj.headers = { 'Content-Type': 'application/json;charset=utf-8' };
    _defObj.transformRequest = [
        function (data, headers) {
            if (headers.post['Content-Type'] == 'application/x-www-form-urlencoded') {
                return qs.stringify(data);
            }
        }
    ]
    _defObj.success = data => {
        _defObj._success(data);
    };
    _defObj.fail = err => {
        _defObj._fail(err);
    };
    _defObj.complete = function (a) { };
    /*发送参数处理*/
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    if (has(_obj, 'dataType')) _obj.responseType = _obj.dataType;
    // 配置覆盖
    if (typeof A.config.req != 'undefined') {
        // 将默认配置传参扩展至传入对象
        if (typeof A.config.req.data != 'undefined') _obj.data = _.extend({}, A.config.req.data, _obj.data);
        // 请求覆盖
        _.extend(_defObj, A.config.req);
    }
    // 传入覆盖
    _.extend(_defObj, _obj);
    // 添加版本号与params参数
    _defObj.url = _defObj.url + "?v=" + A.config.v.split('.')[0];
    /*发送数据*/
    _rqData.push(_defObj);
    if (_defObj.alert) {
        alert(JSON.stringify(_defObj.data));
    }
    Axios(_defObj).then(function (res) {
        if (A.config.testDebug) console.log(res);
        // 服务器正常响应处理
        _rpData.push(res);
        if (res.status == 200) {
            _defObj.success(res.data);
        }
        _defObj.complete(res);
    }).catch(function (err) {
        if (A.config.testDebug) {
            console.log(err);
            alert(_defObj.url + "[data]=>" + JSON.stringify(_defObj.data) + "[err]=>" + err);
        }else{
            // alert(err);
        }
        _rpData.push(err);
        if (err.response) {
            _defObj.fail(err);
            _defObj.complete(err);
        } else {
            _defObj.fail(err);
        }
    });
};

//发起网络请求，返回promise 对象
const RS = _url => {
    return new Promise(function (resolve, reject) {
        let repeatTimes = 1;
        let resObj = function () {
            let _o = {
                url: _url,
                data: {},
                success: res => {
                    if(res.code == 0){
                        resolve(res);
                    }else{
                        wx.alert(res.data || '数据获取失败', function(){
                            location.reload();
                        });
                    }
                },
                fail: err => {
                    if (repeatTimes < 3) {
                        repeatTimes++;
                        setTimeout(() => {
                            R(resObj());
                        }, 600);
                    } else {
                        reject(err);
                    }
                }
            };

            if (typeof (_url) == "object") {
                if (_url['data']) _url['data'] = _.extend(_o.data, _url['data']);
                _.extend(_o, _url);
            }
            return _o;
        }
        R(resObj());
    });
}
module.exports = { R, RS, rmsg, Axios };
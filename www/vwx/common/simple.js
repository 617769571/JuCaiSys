// 网络请求
import request from './request';
import _ from './babel';
import cookie from 'js-cookie';
import validateFrom from './validate/validate';
//格式化时间
/* 
 * @param _val {number|string} 时间值
 * @param _fmt {string} 格式化时间的格式
*/
const dateFormat = (_val, _fmt) => {
    var _fmt = _fmt || "YYYY-MM-DD";
    var fDate = new Date();
    if (typeof _val == "number" || typeof _val == "string") {
        //秒补充为微秒
        _val = (parseInt(_val) < 10000000000) ? parseInt(_val) * 1000 : parseInt(_val);
        fDate = new Date(_val);
    } else if (_val instanceof Date) {
        fDate = _val;
    }
    var o = {
        "M+": fDate.getMonth() + 1, //月份 
        "D+": fDate.getDate(), //日 
        "h+": fDate.getHours(), //小时 
        "m+": fDate.getMinutes(), //分 
        "s+": fDate.getSeconds(), //秒 
        "q+": Math.floor((fDate.getMonth() + 3) / 3), //季度 
        "S": fDate.getMilliseconds() //毫秒 
    };
    if (/(Y+)/.test(_fmt)) {
        _fmt = _fmt.replace(RegExp.$1, (fDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(_fmt)) {
            _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return _fmt;
}
// 格式化金额
const moneyStr = function (_val, n) {
    n = n > 0 && n <= 20 ? n : 2;
    return String(parseFloat(_val).toFixed(n));
}
// FromData上传文件方法，来自weui.js
const uploadFile = function (options) {
    return new Promise(function (resolve, reject) {
        var _def = {
            method: "post",
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        var formData = new FormData();
        if (typeof options.data != 'undefined') {
            for (let key in options.data) {
                if (key == "file") {
                    formData.append(key, options.data[key], options.data[key].name);
                } else {
                    formData.append(key, options.data[key]);
                }
            }
            options.data = formData;
        }
        _.extend(_def, options);

        // 拼接url
        if (_def.url.indexOf('http://') == -1 && _def.url.indexOf('https://') == -1) {
            _def.url = A.config.host + _def.url;
        }
        // request.RS(_def).then(res=>{resolve(res)},err=>{reject(err);})
        // return;
        request.Axios.post(_def.url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(function (res) {
            resolve(res.data);
        }).catch(function (err) {
            reject(err);
        });
    })

}
// 上传图片
const upFile = function (options) {
    let upInput = document.createElement("input");
    upInput.setAttribute("id", "upInput");
    upInput.setAttribute("type", "file");
    upInput.setAttribute("accept", "image/*");
    upInput.setAttribute("capture", "camera");
    return new Promise(function (resolve, reject) {
        A.uploadFile({
            url: "http://www.pintuanqu.cn/WeChatAppsCs/H5_UploadImg/upload_image",
            data: {
                type: 4,
                file: files[0]
            }
        }).then(res => {
            console.log(res)
        }, err => {
            console.log(err)
        })
    })
}
// IOS判断
const isIOS = function () {
    var isIphone = navigator
        .userAgent
        .includes('iPhone');
    var isIpad = navigator
        .userAgent
        .includes('iPad');
    return isIphone || isIpad;
};

/* 
 * @param _id {string} 定时器ID
 * @param _fun {function} 定时器方法函数
 * @param _time {number} 时间频率
*/
const ids = {};
const _setInterval = function (_id, _fun, _time) {
    let time = _time || 1000;
    let count = 0;
    if (ids[_id]) {
        clearInterval(ids[_id]);
        delete ids[_id];
    }
    ids[_id] = setInterval((_ps) => {
        try {
            _ps.count++;
            _fun(_ps)
        } catch (error) {
            clearInterval(ids[_id]);
        }
    }, time, { count })
}
const _clearInterval = function (_id) {
    if (ids[_id]) clearInterval(ids[_id]);
}

module.exports = {
    ...request, dateFormat, uploadFile, cookie, get isIOS() {
        return isIOS();
    },
    setInterval: _setInterval, clearInterval: _clearInterval, moneyStr, validateFrom
};
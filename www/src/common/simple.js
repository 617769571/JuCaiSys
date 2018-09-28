// promise缺省
const promiseReject = function (_obj) {
    return new Promise((resolve, reject) => {
        reject(_obj)
    })
}
// 重写页面title
const setTitle = function (title) {
    document.title = title;
    let _body = document.getElementsByTagName("body")[0];
    let _iframe = document.createElement('iframe');
    _iframe.setAttribute('height', 0);
    _iframe.setAttribute('frameborder', 0);
    _iframe.addEventListener('load', () => {
        setTimeout(() => {
            _body.removeChild(_iframe);
        }, 0);
    })
    _body.appendChild(_iframe);

}
// 剩余时间对象，天、小时、分钟、秒
const rtime = function (_t) {
    return {
        d: parseInt(_t / 86400),
        h: parseInt(_t % 86400 / 3600),
        m: parseInt(_t % 86400 % 3600 / 60),
        s: parseInt(_t % 86400 % 3600 % 60)
    };
}

// 数字转字符串
const nts = function (val, pms) {
    val = val || 0;
    pms = pms || 10;
    return val.toString()
}
// 分享提示
const openShare = function () {
    let _body = document.getElementsByTagName("body")[0];
    let modal = document.createElement('div');
    let mask = document.createElement('div');
    let img = document.createElement('img');
    modal.setAttribute('class', "vwx-modal");
    mask.setAttribute('class', "weui-mask weui-animate-fade-in");
    img.setAttribute('src', "http://www.pintuanqu.cn/Public/WeChatWeb/images/share_alert.png");
    img.setAttribute('style', "z-index: 1000;position: fixed;left:  0;top:  0;");
    modal.appendChild(mask);
    modal.appendChild(img);
    modal.addEventListener("click", function () {
        _body.removeChild(modal);
    }, false);
    _body.appendChild(modal);
}
//返回地址栏url的参数值
const geturlQs = function (_name) {
    var reg = new RegExp("(^|)" + _name + "=([^&]*)(&|$)", "i");
    var r = window.location.href.match(reg);
    var context = "";
    if (r != null) {
        context = r[2];
    }
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
module.exports = { promiseReject, setTitle, openShare, rtime, nts, geturlQs }
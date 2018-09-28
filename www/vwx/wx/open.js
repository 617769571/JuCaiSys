// 微信公众号web-SDK开发
import jwx from 'weixin-js-sdk';
import wxOpen from "./wxConfig";
import request from '../common/request';
// 选择图片
const chooseImage = function (_obj) {
    if (wxOpen.config == false) return false;
    let _def = {
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
    };
    Object.assign(_def, _obj);
    return jwx.chooseImage(_def);
}
// 上传图片
const uploadImage = function (_obj) {
    if (wxOpen.config == false) return false;
    if (typeof _obj["localId"] == "undefined") return false;
    let _def = {
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
        }
    };
    Object.assign(_def, _obj);
    return jwx.uploadImage(_def);
}

// 发送服务器图片信息，微信服务器上的图片信息
const upImage = function (_obj) {
    // 设置默认发送到服务端，微信服务器图片id的参数名
    var serverIdName = _obj["serverId"] || "serverId";
    var _data = {};
    _data[serverIdName] = "";
    // 删除传入的serverId属性
    if (typeof _obj["serverId"] != 'undefined') delete _obj["serverId"];
    if (typeof _obj["data"] != 'undefined') Object.assign(_data, _obj["data"]);
    _obj['data'] = _data;
    return new Promise((resolve, reject) => {
        if (wxOpen.config == false) {
            reject("wx.config还未配置")
            return false;
        } else {
            // 选择图片
            chooseImage({
                success: ok => {
                    // 上传至微信服务器
                    uploadImage({
                        localId: "" + ok.localIds,
                        success: res => {
                            // 判断发送参数
                            if (typeof _obj == "object") {
                                _obj['data'][serverIdName] = res.serverId;
                                // 发送到服务器
                                request.RS(_obj).then(rs => {
                                    resolve(rs)
                                }, err => {
                                    reject(err);
                                });
                            } else {
                                reject('发送参数错误');
                                return false;
                            }
                        },
                        fail: err => {
                            reject(err);
                        }
                    })
                },
                fail: err => {
                    reject(err);
                }
            })
        }
    })
}
// 分享到朋友圈与朋友
const onMenuShare = opt => {
    let _oMessage = {
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link 
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function (res) {
            console.log(res);
        },
        fail: function (err) {
            console.log("err:", err);
        }
    };
    if (A.config.onShare) Object.assign(_oMessage, A.config.onShare);
    Object.assign(_oMessage, opt);
    _oMessage.link = _oMessage.link.replace("token", "t");
    let _oTimeLine = {
        title: _oMessage.desc,
        link: _oMessage.link,
        imgUrl: _oMessage.imgUrl,
        success: _oMessage.success,
        fail: _oMessage.fail
    };
    if (A.isIOS) {
        console.log("IOS分享信息，好友", _oMessage)
        console.log("IOS分享信息，朋友圈", _oTimeLine)
        jwx.onMenuShareAppMessage(_oMessage);
        jwx.onMenuShareTimeline(_oTimeLine);
    } else {
        setTimeout(() => {
            wxOpen.resConfig({ url: "/Port3/WeChatPort/share_deploy" }).then(res => {
                console.log("Android分享信息，签名，好友", _oMessage, res);
                console.log("Android分享信息，签名，朋友圈", _oTimeLine, res);
                if (res.status == 1) {
                    wxOpen.config(res.share_deploy);
                    wxOpen.setjsApiList();
                }
                jwx.ready(function () {
                    jwx.onMenuShareAppMessage(_oMessage);
                    jwx.onMenuShareTimeline(_oTimeLine);
                    console.log("配置Android分享OK", _oMessage);
                })
            })
        }, 100);
    }
}

module.exports = { jwx, chooseImage, uploadImage, upImage, onMenuShare };
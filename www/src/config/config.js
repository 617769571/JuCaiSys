const config = {
    get c() {
        return "1.0.0";
    },
    get v() {
        return "ms";
    },
    get host() {
        return "http://47.96.118.227:8080/jucai";
    },
    oApi: {},
    // 请求数据配置 application/x-www-form-urlencoded
    req: {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        data: { }
    },
    // 微信sdk接口
    wxjsApiList: [
        'checkJsApi',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'hideOptionMenu',
        'getLocation',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
    ],
    // 是否只是运行微信中访问
    wxonly: false,
    // 微信分享默认配置
    onShare: {
        title: '聚财钱包', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
    },
    // 全局默认页面地址
    dPage: {
        index: "/pages/index/index",
    },
    // 默认缓存
    dApi: {
        "/WeChatAppsCs/Member/index": true
    },
    showBar: [ ]
}
module.exports = config
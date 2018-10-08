import { Page } from "vwx";
import tpl from "./download.html";
import './download.less';

var timer = null;
module.exports = Page({
    name: "download",
    template: tpl,
    data: {
        os: ''
    },
    onLoad: function (opts) {
        var os = window.navigator.userAgent.toLowerCase();
        console.log(os);
        var isAndroid = os.indexOf('android') > -1 || os.indexOf('linux') > -1; //android
        var isIOS = os.indexOf('iphone') > -1 || os.indexOf('ipad') > -1; //ios
        if(isAndroid){
            this.os = 'android';
        }else if(isIOS){
            this.os = 'ios';
        }
    },
    // 下载
    download: function(){
        if(this.os == 'android'){
            window.location.href = 'https://www.jctt.top/jcapp.apk';
        }else if(this.os == 'ios'){
            window.location.href = 'https://www.jctt.top/jcapp.ipa';
        }
    }
});

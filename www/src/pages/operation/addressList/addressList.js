import { Page } from "vwx";
import tpl from "./addressList.html";
import './addressList.less';

var timer = null;
module.exports = Page({
    name: "addressList",
    template: tpl,
    data: {
        id: '',
        list: []
    },
    onLoad: function (opts) {
        const that = this;
        // 参数
        that.id = this.$route.query.id;
        // 获取通讯录
        that.gettList();
    },
    // 获取通讯录
    gettList: function(){
        A.updata.getAddressList(this.id).then(res => {
            if(res.code == 0){
                this.list = res.data;
            }
        }, err => {})
    },
    // 返回
    goBack: function(){
        A.router.goBack();
    }
});

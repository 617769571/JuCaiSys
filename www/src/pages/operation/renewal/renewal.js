import { Page } from "vwx";
import tpl from "./renewal.html";
import './renewal.less';

module.exports = Page({
    name: "renewal",
    template: tpl,
    data: {
        info: {}
    },
    onLoad: function (opts) {
        this.info.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取续费信息
    getInfo: function () {
        A.updata.getRenewalInfo(this.info.id).then(res => {
            if(res.code == 0){
                this.info = res.data;
            }
        }, err => {})
    },
    // 提交修改续费信息
    submitEdit: function(){
        A.updata.editRenewal(this.info).then(res => {
            if(res.code == 0){
                wx.alert(res.data || '修改成功', this.goBack)
            }
        }, err => {})
    },
    // 返回
    goBack: function(){
        A.router.goBack();
    }
});

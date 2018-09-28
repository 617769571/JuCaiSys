import { Page } from "vwx";
import tpl from "./editLimit.html";
import './editLimit.less';


module.exports = Page({
    name: "editLimit",
    template: tpl,
    data: {
        info: {}
    },
    onLoad: function (opts) {
        this.info.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取贷款额度
    getInfo: function () {
        A.updata.getLimitInfo(this.info.id).then(res => {
            if(res.code == 0){
                this.info = res.data;
            }
        }, err => {})
    },
    // 提交修改额度
    submitEdit: function(){
        A.updata.editLimit(this.info).then(res => {
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

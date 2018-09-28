import { Page } from "vwx";
import tpl from "./editCustomerInfo.html";
import './editCustomerInfo.less';


module.exports = Page({
    name: "editCustomerInfo",
    template: tpl,
    data: {
        info: {}
    },
    onLoad: function (opts) {
        this.info.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取客户基本信息
    getInfo: function () {
        A.updata.getCustomerInfo(this.info.id).then(res => {
            if(res.code == 0){
                this.info = res.data.customer;
            }
        }, err => {})
    },
    // 提交修改客户基本信息
    submitEdit: function(){
        A.updata.editCustomerInfo(this.info).then(res => {
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

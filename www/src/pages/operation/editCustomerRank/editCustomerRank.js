import { Page } from "vwx";
import tpl from "./editCustomerRank.html";
import './editCustomerRank.less';


module.exports = Page({
    name: "editCustomerRank",
    template: tpl,
    data: {
        info: {}
    },
    onLoad: function (opts) {
        this.info.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取贷款金额
    getInfo: function () {
        A.updata.getCustomerRankInfo(this.info.id).then(res => {
            if(res.code == 0){
                this.info = res.data;
            }
        }, err => {})
    },
    // 提交修改金额
    submitEdit: function(){
        A.updata.editCustomerRank(this.info).then(res => {
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

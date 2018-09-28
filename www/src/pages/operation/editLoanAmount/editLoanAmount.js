import { Page } from "vwx";
import tpl from "./editLoanAmount.html";
import './editLoanAmount.less';


module.exports = Page({
    name: "editLoanAmount",
    template: tpl,
    data: {
        loanAmount: 0,
        curLoanAmount: 0
    },
    onLoad: function (opts) {
        this.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取贷款金额
    getInfo: function () {
        A.updata.getLoanAmountInfo(this.id).then(res => {
            if(res.code == 0){
                this.curLoanAmount = res.data.borrowAmount;
            }
        }, err => {})
    },
    // 提交修改金额
    submitEdit: function(){
        A.updata.editLoanAmount(this.id, this.loanAmount).then(res => {
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

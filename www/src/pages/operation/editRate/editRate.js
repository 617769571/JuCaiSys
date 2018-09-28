import { Page } from "vwx";
import tpl from "./editRate.html";
import './editRate.less';

module.exports = Page({
    name: "editRate",
    template: tpl,
    data: {
        info: [
            { name: '逾期费率(%)', field: 'overdueRate' },
            { name: '手续费率(%)', field: 'handlingRate' },
            { name: '滞纳金/分', field: 'lataAmount' },
            { name: '还款期限/天', field: 'termDay' }
        ],
        rate: {}
    },
    onLoad: function (opts) {
        this.rate.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取费率信息
    getInfo: function () {
        A.updata.getRateInfo(this.rate.id).then(res => {
            if(res.code == 0){
                this.rate = res.data;
            }
        }, err => {})
    },
    // 提交修改费率
    submitEdit: function(){
        A.updata.editRate(this.rate).then(res => {
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

import { Page } from "vwx";
import tpl from "./rate.html";
import './rate.less';

module.exports = Page({
    name: "editLoanAmount",
    template: tpl,
    data: {
        info: [
            { name: '逾期费率(%)', field: 'overdueRate' },
            { name: '手续费率(%)', field: 'handlingRate' },
            { name: '滞纳金/元', field: 'lataAmount' },
            { name: '还款期限/天', field: 'termDay' }
        ],
        rate: {}
    },
    onLoad: function (opts) {
        this.getInfo();
    },
    // 获取费率信息
    getInfo: function () {
        A.updata.getRateInfo().then(res => {
            if(res.code == 0){
                this.rate = res.data;
            }
        }, err => {})
    },
    // 修改费率
    editRate: function(){
        A.router.push({ path: '/editRate?id=' + this.rate.id })
    }
});

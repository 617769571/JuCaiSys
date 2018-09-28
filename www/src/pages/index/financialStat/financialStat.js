import { Page } from "vwx";
import tpl from "./financialStat.html";
import './financialStat.less';


module.exports = Page({
    name: "financialStat",
    template: tpl,
    data: {
        type: ['总', '日', '月'],
        list: [],
        info: {
            title: '贷款统计表',
            value: ['申请借款金额', '放贷金额', '待还金额', '续期金额', '逾期金额', '手续费', '滞纳金额', '收益'],
            // value: ['申请借款金额', '放贷金额', '待还金额', '续期金额', '逾期金额', '手续费', '滞纳金额', '逾期罚息金额', '预期违约金额', '收益'],
        },
        field: ['appliLoanAmount', 'realLoanAmount', 'repaidAmount', 'renewalAmount', 'overdueAmount', 'handlingAmount', 'lateAmount', 'incomeAmount']
        // field: ['appliLoanAmount', 'realLoanAmount', 'repaidAmount', 'renewalAmount', 'overdueAmount', 'handlingAmount', 'lateAmount', '', '', 'incomeAmount']
    },
    onLoad: function () {
        this.getList();
    },
    getList: function () {
        A.updata.getFinancialStatList(1).then(res => {
            if(res.code == 0){
                this.list.push(res.data || []);
            }
        }, err => {})
        A.updata.getFinancialStatList(2).then(res => {
            if(res.code == 0){
                this.list.push(res.data || []);
            }
        }, err => {})
        A.updata.getFinancialStatList(3).then(res => {
            if(res.code == 0){
                this.list.push(res.data || []);
            }
        }, err => {})
    },
});

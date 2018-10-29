import { Page } from "vwx";
import tpl from "./customerInfo.html";
import './customerInfo.less';

var timer = null;
module.exports = Page({
    name: "customerInfo",
    template: tpl,
    data: {
        // 表结构
        info: [
            {
                title: '银行卡认证',
                items: [
                    { title: '账号', field: '' },
                    { title: '银行', field: '' },
                    { title: '预留电话', field: '' },
                    { title: '添加时间', field: '' },
                    { title: '状态', field: '' }
                ],
                data: 'bankAuth'
            },{
                title: '贷款列表',
                items: [
                    { title: '贷款金额', field: '' },
                    { title: '贷款期限', field: '' },
                    { title: '手续费', field: '' },
                    { title: '申请时间', field: '' },
                    { title: '应还时间', field: '' },
                    { title: '实际还款时间', field: '' },
                    { title: '逾期天数', field: '' },
                    { title: '状态', field: '' }
                ],
                data: 'loanList'
            }
        ],
        // 表单数据
        form: {
            phone: 3,
            msg: 0,
            wechat: 0,
            endDate1: '',
            parentPhone: 1,
            otherPhone: 1,
            endDate2: '',
            lawPhone: 1,
            lawyerLetter: 0,
            sue: 0,
            endDate3: '',
            amount: '',
            sendBack: 0,
            procedure: 0,
            courtDate: '',
            adjudgeDate: '',
            executeDate: '',
            deadbeat: 0
        }
    },
    onLoad: function (opts) {
        this.id = this.$route.query.id;
        // this.getInfo();
        debugger;
    },
    // 获取客户基本信息
    getInfo: function(){
        A.updata.getCustomerInfo(this.id).then(res => {
            if(res.code == 0){
                this.id = res.data.id;
                this.form = res.data;
                this.bankAuth = res.data;
                this.loanList - res.data;
            }
        }, err => {})
    },
    // 查看通讯录
    goAddrList: function(e){
        A.router.push({ path: '/addressList?id=' + this.id});
    },
    // 提交风控信息
    submitInfo: function(e){
        A.updata.editCusRiskManageInfo(this.form).then(res => {
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

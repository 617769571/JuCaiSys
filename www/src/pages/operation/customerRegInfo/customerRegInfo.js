import { Page } from "vwx";
import tpl from "./customerRegInfo.html";
import './customerRegInfo.less';

var timer = null;
module.exports = Page({
    name: "customerRegInfo",
    template: tpl,
    data: {
        // 表结构
        info: [
            {
                title: '银行卡认证',
                items: [
                    { title: '账号', field: 'bankNo' },
                    { title: '银行', field: 'bankName' },
                    { title: '预留电话', field: 'reservePhone' },
                    { title: '添加时间', field: 'createTime' },
                ],
                data: {},
                operation: []
            },{
                title: '贷款列表',
                items: [
                    { title: '贷款金额', field: 'borrowAmount' },
                    { title: '贷款期限', field: '', value: 7},
                    { title: '手续费', field: 'handlingFee' },
                    { title: '申请时间', field: 'createTime' },
                    { title: '还款时间', field: 'repayTime' },
                    { title: '逾期天数', field: 'overdueDay' },
                    { title: '状态', field: 'statusStr' }
                ],
                data: {},
                operation: [
                    { name: '拉黑', func: 'putInBlacklist' },
                    { name: '等级修改', func: 'editRank' },
                    { name: '修改贷款额度', func: 'editLimit' }
                ]
            }
        ],
        data: {},
        regInfo: {},
        bankAuth: {},
        loanList: {}
    },
    onLoad: function (opts) {
        this.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取客户注册信息
    getInfo: function(){
        A.updata.getCustomerRegInfo(this.id).then(res => {
            if(res.code == 0){
                this.id = res.data.customer.id;
                this.regInfo = res.data.customer;
                this.info[0].data = res.data.bankCard;
                this.info[1].data = res.data.bbrrowInfoList;
            }
        }, err => {})
    },
    // 修改备注
    editRemark: function(){
        A.router.push({ path: '/editRemark?id=' + this.id});
    },
    // 查看资信报告
    goCreditReport: function(){
        A.updata.getEncodeStr(this.regInfo.idCard).then(res => {
            if(res.code == 0){
                location.href = 'https://credit.baiqishi.com/clweb/api/common/getreportpage?partnerId=lyjc&certNo=' + this.regInfo.idCard + '&name=' + encodeURIComponent(this.regInfo.customerName) + '&mobile=' + this.regInfo.telephone + '&timeStamp=' + res.data.timeStamp + '&token=' + res.data.token;
            }
        }, err => {})
    },
    // 查看风险名单
    goRiskNameList: function(){
        A.router.push({ path: '/nameList?type=0&id=' + this.id});
    },
    // 查看芝麻欺诈名单
    goSesameFraudNameList: function(){
        A.router.push({ path: '/nameList?type=1&id=' + this.id});
    },
    // 查看通讯录
    goAddrList: function(e){
        A.router.push({ path: '/addressList?id=' + this.id});
    },
    // 拉黑
    putInBlacklist: function(){
        A.updata.putInBlacklist(this.id).then(res => {
            if(res.code == 0){
                wx.alert(res.msg, this.onLoad);
            }
        }, err => {});
    },
    // 等级修改
    editRank: function(){
        A.router.push({ path: '/editCustomerRank?id=' + this.id});
    },
    // 修改贷款额度
    editLimit: function(e){
        A.router.push({ path: '/editLimit?id=' + this.id});
    },
    // 返回
    goBack: function(){
        A.router.goBack();
    }
});

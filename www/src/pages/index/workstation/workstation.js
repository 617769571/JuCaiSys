import { Page } from "vwx";
import tpl from "./workstation.html";
import './workstation.less';


module.exports = Page({
    name: "workstation",
    template: tpl,
    data: {
        info: [{
            title: '注册用户数量',
            field: 'registertCount',
            class: 'reg_num'
        }, {
            title: '申请用户数量',
            field: 'applicationCount',
            class: 'apply_num'
        }, {
            title: '放款用户数量',
            field: 'giveCount',
            class: 'loan_num'
        }],
        info1: {
            '软件版本信息': {
                '系统名称': '每周口袋管理系统',
                '系统版本': '1.0.0',
                '开发团队': '每周口袋',
                '开发公司': '每周口袋'
            },
            '系统基本信息': {
                'GD库版本': '******',
                '服务器操作系统': '******',
                '服务器IP': '******'
            }
        },
        data:{
            loanAmount: 1000,
            loaningAmount: 1000
        }
    },
    onLoad: function () {
        this.getData();
    },
    getData: function () {
        A.updata.getWorkstationData().then(res => {
            if(res.code == 0){
                this.data = res.data;
            }
        }, err => {});
    },
    watch: {
        
    },
});

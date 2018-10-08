import { Page } from "vwx";
import tpl from "./editLimit.html";
import './editLimit.less';
import Axios from 'axios';


module.exports = Page({
    name: "editLimit",
    template: tpl,
    data: {
        info: {
            loanLimit:800,
        }
    },
    onLoad: function (opts) {
        this.info.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取贷款额度
    getInfo: function () {
        // A.updata.getLimitInfo(this.info.id).then(res => {
        //     if(res.code == 0){
        //         this.info = res.data;
        //     }
        // }, err => {})
        return Axios({
            method: 'POST',
            url: '/jucai/get/CustomerAmount',
            params: {
                customerId: this.$route.query.id
            },
            
        }).then(function(res){
            if(res.code == 0){
                this.info.loanLimit = res.data;
            }
        })
    },
    // 提交修改额度
    submitEdit: function(){
        // A.updata.editLimit(this.info).then(res => {
        //     if(res.code == 0){
        //         wx.alert(res.data || '修改成功', this.goBack)
        //     }
        // }, err => {})
        return Axios({
            method: 'POST',
            url: '/jucai/update/Customer',
            params: {
                id: this.$route.query.id,
                amount:this.info.loanLimit
            },
           
        }).then(function(res){
            if(res.code == 0){
                if(res.code == 0){
                    // wx.alert('修改成功',this.goBack);
                    alert('修改成功');
                    
                }
            }
        })
    },
    // 返回
    goBack: function(){
        A.router.goBack();
    }
});

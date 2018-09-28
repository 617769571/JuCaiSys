import { Page } from "vwx";
import tpl from "./editAccount.html";
import './editAccount.less';


module.exports = Page({
    name: "list",
    template: tpl,
    data: {
        roles: ['请选择', '管理员', '客服', '风控', '催收', '财务'],
        info: [
            { name: '角色', field: 'role' },
            { name: '账号', field: 'account' },
            { name: '密码', field: 'password' }
        ],
        account: {
            role: '请选择',
            no: '',
            password: '123456'
        }
    },
    onLoad: function (opts) {
        this.id = this.$route.query.id;

        if(this.id){
            // 获取数据
            that.getInfo();
        }
    },
    // 获取账号数据
    getInfo: function(){
        A.updata.getAccountInfo(id).then(res => {
            if(res.code == 0){
                this.account = res.data;
            }
        }, err => {})
    },
    // 提交修改数据
    submitEdit: function(){
        A.updata.editAccount(this.account).then(res => {
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

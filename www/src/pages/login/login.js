import { Page } from "vwx";
import tpl from "./login.html";
import './login.less';


module.exports = Page({
    name: "login",
    template: tpl,
    data: {
        imgCode: '', // 图片验证码
        username: '', // 用户名
        password: '', // 密码
        identyCode: '' // 验证码
    },
    onLoad: function () {
        
    },
    // 提交表单
    submitForm: function(){
        const that = this;
        let valReg = A.validateFrom({
            username: that.username,
            password: that.password,
            // identyCode: that.identyCode
        }, {
            username: { exp: ['empty', /^[A-Za-z0-9-_]{4,16}$/], err: '请输入正确格式的用户名'},
            password: { exp: 'empty', err: '请输入密码'},
            // identyCode: { exp: ['empty', /^[A-Za-z0-9]{4}$/], err: '请输入正确格式的验证码'},
        });
        if(valReg !== true){
            wx.alert(valReg);
            return;
        }
        A.updata.submitLoginForm(that.username, that.password).then(res => {
            if(res.code == 0){
                wx.setStorageSync('user', {
                    role: A.data.roleJava.indexOf(res.data.level),
                    name: that.username,
                    id: res.data.adminId
                });
                A.router.replace({ path: 'home' });
            }
        }, err => {})
    }
});

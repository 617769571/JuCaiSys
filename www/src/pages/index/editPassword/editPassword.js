import { Page } from "vwx";
import tpl from "./editPassword.html";
import './editPassword.less';


module.exports = Page({
    name: "editPassword",
    template: tpl,
    data: {
        oldPassword: '',
        newPassword: '',
    },
    onLoad: function () {
        
    },
    submitForm: function(){
        const that = this;
        let valReg = A.validateFrom({
            oldPassword: that.oldPassword,
            newPassword: that.newPassword
        }, {
            oldPassword: { exp: 'empty', err: '请输入旧密码'},
            newPassword: { exp: 'empty', err: '请输入新密码'},
        });
        if(valReg !== true){
            wx.alert(valReg);
            return;
        }
        if(that.oldPassword == that.newPassword){
            wx.alert('旧密码和新密码一样，请重新设置');
            return;
        }
        let user = wx.getStorageSync('user');
        A.uodata.submitEditPwdForm(user.id, user.name, that.oldPassword, that.newPassword ),then(res => {
            if(res.code == 0){
                wx.alert(res.data || '密码修改成功，请重新登录！', function(){
                    A.router.replace({ path: 'login' });
                });
            }
        }, err => {})
    }
});

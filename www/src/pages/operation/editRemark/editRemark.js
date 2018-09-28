import { Page } from "vwx";
import tpl from "./editRemark.html";
import './editRemark.less';

module.exports = Page({
    name: "editRemark",
    template: tpl,
    data: {
        info: {}
    },
    onLoad: function (opts) {
        this.info.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取备注信息
    getInfo: function () {
        A.updata.getRemarkInfo(this.info.id).then(res => {
            if(res.code == 0){
                this.info = {
                    type: 1,
                    customerId: res.data.id,
                    kfName: res.data.kfName,
                    kfRemark: res.data.kfRemark
                };
            }
        }, err => {})
    },
    // 提交修改续费信息
    submitEdit: function(){
        A.updata.editRemark(this.info).then(res => {
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

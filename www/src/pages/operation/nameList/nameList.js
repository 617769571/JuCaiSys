import { Page } from "vwx";
import tpl from "./nameList.html";
import './nameList.less';

module.exports = Page({
    name: "nameList",
    template: tpl,
    data: {
        info: {}
    },
    onLoad: function (opts) {
        this.type = this.$route.query.type;
        if(this.type == 0){
            this.title = '风险名单查询';
            this.url = '';
        }else if(this.type == 1){
            this.title = '芝麻欺诈名单查询'
            this.url = '';
        }
        this.id = this.$route.query.id;
        this.getInfo();
    },
    // 获取备注信息
    getInfo: function () {
        A.updata.getNameList(this.url, this.id).then(res => {
            if(res.code == 0){
                this.info = res.data;
            }
        }, err => {})
    },
    // 返回
    goBack: function(){
        A.router.goBack();
    }
});

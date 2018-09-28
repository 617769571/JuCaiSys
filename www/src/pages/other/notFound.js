import { Page } from "vwx";
import tpl from "./notFound.html";
import './notFound.less';

module.exports = Page({
    name: "notFound",
    template: tpl,
    data:{
        nopage:""
    },
    onLoad(){
        if(A.config.testDebug){
            this.nopage=window.location.href;
        }
    }
});

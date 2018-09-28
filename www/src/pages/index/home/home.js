import { Page } from "vwx";
import tpl from "./home.html";
import './home.less';


module.exports = Page({
    name: "home",
    template: tpl,
    data: {
        info: {
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
        }
    },
    onLoad: function () { }
});

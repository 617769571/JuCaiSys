# 初始化安装

## Npm

```
npm i
```
# 开发调试
```
npm run dev
```
* 修改webpack配置文件
```
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        host: "192.168.1.155",
        port: 8080,
        publicPath: '/'
    }
```
host修改为本机ip

# 发布
```
npm run build
```

# 项目使用

* 页面添加添加
  打开pages/pages.js文件，修改页面路由地址

```javascript
import index from './demo/index/index.js';
//动态按需载入
const modal = () => import('./demo/modal/modal.js');
export default [
        { path: '/', component: index, name: "index" },
];

```
# page说明
   * onLoad
    // 生命周期函数--监听页面加载
    
   * onReady
    // 生命周期函数--监听页面初次渲染完成
    
   * onShow
    // 生命周期函数--监听页面显示
    
   * onHide
    // 生命周期函数--监听页面隐藏
    
   * onUnload
    // 生命周期函数--监听页面卸载
   
   * onShareAppMessage
    //用户点击右上角分享
   
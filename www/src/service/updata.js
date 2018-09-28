import Review from './review';
import category from './category';
import api from './api';
module.exports = {
    ...api,
    getTData: function (_url) {
        return new Promise((resolve, reject) => {
            A.RS(_url).then(res => {
                wx.hideLoading();
                if(res.code == 500){
                    wx.alert(res.data);
                } else {
                    resolve(res);
                }
            }, err => {
                wx.hideLoading();
                wx.alert(err);
                reject(err);
            });
        })
    },
    // 获取需要本地存储的get数据
    getTDataStorage(_url) {
        return new Promise((resolve, reject) => {
            if (category.selector(_url) && !Review.api(_url)) {
                // 如果本地存在数据，并无更新要求
                resolve(category.selector(_url));
            } else {
                // 请求接口数据
                A.RS(_url).then(data => {
                    // 存储数据到本地
                    category.set(_url, data);
                    // 设置接口更新状态
                    Review.setApi(_url, false);
                    resolve(data);
                }, err => {
                    reject(err);
                });
            }
        })
    },
    // post提交数据
    postTData(_obj) {
        if (typeof _obj['url'] != "undefined" && typeof _obj['data'] != "undefined") {
            return A.RS({ data: _obj['data'], url: _obj['url'], method: 'POST' });
        } else {
            return new Promise((resolve, reject) => {
                reject("error data");
            })
        }
    }
}
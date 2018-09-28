import _tpl from './uploader-view.html';
import weui from 'weui.js';
import './uploader.css';
module.exports = {
    name: 'vwx-uploader',
    template: _tpl,
    data: function () {
        return {
            uploadCount: 0
        }
    },
    model:{
        
    },
    props: {
        id: {
            type: String,
            default: 'uploader'
        },
        url: {
            type: String,
            default: 'http://localhost:8081'
        },
        type: {
            type: String,
            default: 'file'
        },
        fileVal: {
            type: String,
            default: 'file'
        },
        compress: {
            type: Object,
            default: function () {
                return {
                    width: 1600,
                    height: 1600,
                    quality: .8
                }
            }
        }
    },
    created() {

    },
    mounted() {
        let that = this;
        weui.uploader("#" + this.id, {
            url: this.url,
            auto: true,
            type: this.type,
            fileVal: this.fileVal,
            // compress配置，图片的最大尺寸，压缩质量0-1
            compress: this.compress,
            // 文件添加前的回调
            onBeforeQueued: function (files) {
                that.$emit('beforequeued', files);
            },
            // 文件添加成功的回调
            onQueued: function (res) {
                that.$emit('queued', that);
            },
            // 文件上传前调用
            onBeforeSend: function (data, headers) {
                that.$emit('beforeSend', data, headers);
            },
            // 上传进度的回调
            onProgress: function (procent) {
            },
            // 上传成功的回调
            onSuccess: function (ret) {
                that.uploadCount++;
                that.$emit('success', ret);
            },
            // 上传失败的回调
            onError: function (err) {
                that.$emit('error', err);
            }
        });
    }
};

import _tpl from './modal.html';
import './modal.less';
module.exports = {
  name: "vwx-modal-input",
  template: _tpl,
  props: {},
  data: function () {
    return {
      show: false,
      showCancel: false,
      showConfirm:true,
      title: "",
      bgopy:false,
      cancelText: "取消",
      confirmText: "确认"
    }
  },
  created() { },
  methods: {
    open(option) {
      for (let key in option) {
        if (typeof this[key] !='undefined') this[key] = option[key];
      }
      this.show = true;
    },
    close() {
      this.show = false;
    },
    success() {

    },
    cancel() {
      this.success({ confirm: false, cancel: true });
      this.$emit('cancel')
      this.show = false;
    },
    confirm() {
      this.success({ confirm: true, cancel: false });
      this.$emit('confirm')
      this.show = false;
    }
  }
};
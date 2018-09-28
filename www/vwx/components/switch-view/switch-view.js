import _tpl from './switch-view.html';

module.exports = {
    name: 'vwx-switch',
    template: _tpl,
    data: function () {
        return {
            checked: false
        }
    },
    props: {
        value: {
            type: [Boolean, String, Number],
            default: false
        },        
        disabled: {
            type: [Boolean, String, Number],
            default: false
        }
    },
    created() {
        this.checked=this.value;
    },
    mounted(){
        this.$refs.input.disabled=this.disabled;
    },
    methods: {
        handleChange(event) {
            this.$emit('input', event.target.checked);
        }
    }
};

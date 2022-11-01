"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      classify: [
        { id: 0, name: "\u7384\u5E7B", style: "background-color:#2979ff" },
        { id: 1, name: "\u79D1\u5E7B", style: "#94bcff" },
        { id: 2, name: "\u4ED9\u4FA0", style: "#d4e4ff" }
      ]
    };
  },
  onLoad() {
  },
  onPullDownRefresh() {
    console.log("\u9875\u9762\u5237\u65B0\u6210\u529F");
  },
  methods: {
    async callco() {
      const co1 = common_vendor.pn.importObject("col");
      let res = await co1.say("Hello,I'm");
      common_vendor.index.showModal({
        content: JSON.stringify(res),
        showCancel: false
      });
    },
    search(res) {
      common_vendor.index.showToast({
        title: "fasong" + res.value,
        icon: "none"
      });
    },
    chargeBook() {
      common_vendor.index.showToast({
        title: "\u4F60\u6210\u529F\u6253\u5F00\u4E86\u7384\u5E7B\u5206\u7C7B",
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.p({
      radius: 20,
      clearButton: "auto",
      cancelButton: "none"
    }),
    c: common_vendor.f($data.classify, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.style,
        c: common_vendor.o((...args) => $options.chargeBook && $options.chargeBook(...args), item.id),
        d: item.id
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fruiticecake/openLocal/uniVue-2/pages/auth/auth.vue"]]);
wx.createPage(MiniProgramPage);

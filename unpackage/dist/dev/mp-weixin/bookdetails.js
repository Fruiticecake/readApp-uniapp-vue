"use strict";
var common_vendor = require("./common/vendor.js");
const _sfc_main = {
  __name: "bookdetails",
  props: {
    contents: String
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(props).contents)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fruiticecake/openLocal/uniVue-2/pages/bookdetails/bookdetails.vue"]]);
exports.Component = Component;

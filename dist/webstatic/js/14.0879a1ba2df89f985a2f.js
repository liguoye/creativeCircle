webpackJsonp([14],{IZiG:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("ynPL"),o={components:{tableCom:e("uyiJ").a},created:function(){this.queryData()},data:function(){return{msg:"orderMessage",page:1,total:0,formData:{date:""},tableData:{data:[],columns:[{name:"任务号",code:"id",width:""},{name:"订单编号",code:"ordersn",width:""},{name:"商品简称",code:"title",width:""},{name:"掌柜号",code:"shop_name",width:""},{name:"任务类型",code:"taskType",width:"",com:"taskType"},{name:"担保金额",code:"danbao",width:"",com:"danbao"},{name:"实际金额",code:"price",width:""},{name:"发布点",code:"MinLi",width:""},{name:"置顶费用",code:"zdfee",width:""},{name:"自发空包减免费用",code:"expressType",width:"140",com:"expressType"},{name:"支付时间",code:"ct",width:"150"}]}}},methods:{handleCurrentChange:function(t){this.page=t,this.queryData("param")},queryData:function(t){var a=this,e={params:{token:this.$getToken(),type:1,status:4}};t&&(e={params:{token:this.$getToken(),type:1,page:this.page,start:this.formData.date[0],end:this.formData.date[1],status:4}}),this.$ajax.get("shopmember/releaseList",e).then(function(t){if(t&&t.data&&1===t.data.code){console.log(t);var e=t.data.data.data;e.forEach(function(t){t.price=t.price/100,t.MinLi=t.MinLi/100,t.zdfee=t.zdfee/100}),a.tableData.data=e,a.total=t.data.data.total,a.page=1}})},handleDownload:function(){var t=this;if(this.tableData.data.length<=0)return this.$notify({title:"没有数据可导出",type:"warning"}),!1;this.downloadLoading=!0;for(var a=[],n=[],o=0;o<this.tableData.columns.length;o++)a.push(this.tableData.columns[o].name),n.push(this.tableData.columns[o].code);e.e(28).then(function(){var o=e("zWO4").exportJsonToExcel,s=t.tableData.data,r=t.formatJson(n,s);o(a,r,"列表excel"),t.downloadLoading=!1}.bind(null,e)).catch(e.oe)},formatJson:function(t,a){return a.map(function(a){return t.map(function(t){return a[t]})})}}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"red"},[t._v("此表格用于记录所有精刷单已支付的订单信息")]),t._v(" "),e("div",{staticClass:"evaluationManagement"},[e("div",{staticClass:"btnGroup"},[e("el-row",[e("el-col",{staticClass:"formGroup",staticStyle:{"text-align":"left !important"},attrs:{span:12}},[e("span",[t._v("统计时间")]),t._v(" "),e("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.formData.date,callback:function(a){t.$set(t.formData,"date",a)},expression:"formData.date"}})],1),t._v(" "),e("el-col",{staticStyle:{"line-height":"40px"},attrs:{span:12}},[e("el-button",{staticClass:"tablebtnActive",staticStyle:{"margin-left":"0px"},on:{click:function(a){return t.queryData("param")}}},[t._v("查询")]),t._v(" "),e("el-button",{staticClass:"tablebtnFFF",staticStyle:{"margin-left":"0px"},on:{click:function(a){return t.handleDownload()}}},[t._v("导出")])],1)],1)],1),t._v(" "),e("div",{staticClass:"tableCom"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData.data,border:"",height:"400"}},[t._l(t.tableData.columns,function(a,n){return["expressType"==a.com?[e("el-table-column",{key:n,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[t.tableData.data[n.$index][a.code].expressType?e("p",[t._v(t._s(2))]):e("p",[t._v("0")])]}}],null,!0)})]:"taskType"==a.com?[e("el-table-column",{key:n,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("p",[t._v("精刷单")])]}}],null,!0)})]:"danbao"==a.com?[e("el-table-column",{key:n,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[t.tableData.data[n.$index][a.code]>198?e("p",[t._v("198")]):e("p",[t._v(t._s(t.tableData.data[n.$index][a.code]))])]}}],null,!0)})]:[e("el-table-column",{key:n,attrs:{width:a.width,prop:a.code,label:a.name,align:"center "}})]]})],2),t._v(" "),e("div",{staticClass:"pagination "},[e("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[20],layout:"total, sizes, prev, pager, next, jumper ",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)])])},staticRenderFns:[]};var r=e("C7Lr")(o,s,!1,function(t){e("ybOS")},"data-v-05917e93",null).exports,i={components:{navList:n.a,orderDetailMsg:r},props:{},data:function(){return{currentTab:"orderMessage",topTabCurrent:"1",name:"",money:""}},methods:{navListClick:function(t){this.$router.push({name:t,param:{tab:t}})},toPNavChangeTab:function(t){console.log(t),this.topTabCurrent=t}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"orderMessage"},[e("el-row",[e("el-col",{staticClass:"navList",attrs:{span:4}},[e("nav-list",{attrs:{"current-tab":t.currentTab}})],1),t._v(" "),e("el-col",{staticClass:"accountManage",attrs:{span:18}},[e("div",{staticClass:"taskManagementNavList topList"},[e("ul",[e("li",{class:"1"==t.topTabCurrent?"current":"",on:{click:function(a){return t.toPNavChangeTab("1")}}},[t._v("精刷单订单详情信息")])])]),t._v(" "),e("div",{staticClass:"tabContent"},["1"==t.topTabCurrent?e("order-detail-msg"):t._e()],1)])],1)],1)},staticRenderFns:[]};var c=e("C7Lr")(i,l,!1,function(t){e("KUTR")},"data-v-7af50c46",null);a.default=c.exports},KUTR:function(t,a){},ybOS:function(t,a){}});
//# sourceMappingURL=14.0879a1ba2df89f985a2f.js.map
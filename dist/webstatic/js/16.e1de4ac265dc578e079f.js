webpackJsonp([16],{JPTJ:function(t,a){},U35R:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("06DN"),n=e("uyiJ"),s={components:{navList:l.a,tableCom:n.a},created:function(){this.queryData()},data:function(){return{currentTab:"taoBaoAsk",page:1,total:0,formData:{status:{value:"",options:[{label:"待评价",value:1},{label:"待审核",value:2},{label:"审核不通过",value:3},{label:"已完成",value:4},{label:"已取消",value:6}]},type_find:{value:"",options:[{label:"任务编号",value:1},{label:"运单号",value:2},{label:"店铺名称",value:3},{label:"买号名称",value:4},{label:"商品编号",value:5},{label:"商品简称",value:6}]},name:"",date:""},tableData:{data:[],columns:[{name:"任务/订单编号",code:"ordersn",width:""},{name:"买号/商品信息",code:"goodMsg",width:""},{name:"提问与回答",code:"task3",width:""},{name:"任务状态",code:"status",width:""},{name:"操作按钮",code:"btn",width:""}]}}},methods:{handleCurrentChange:function(t){this.page=t,this.queryData("param")},queryData:function(t){var a=this,e={params:{token:this.$getToken()}};t&&(e={params:{token:this.$getToken(),page:this.page,status:this.formData.status.value,name:this.formData.name,type_find:this.formData.type_find.value,start:this.formData.date[0],end:this.formData.date[1]}}),this.$ajax.get("shopmember/EvaluateList",e).then(function(t){t&&t.data&&1===t.data.code&&(a.tableData.data=t.data.data.data,a.total=t.data.data.total,a.page=1)})}}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"taskManagement"},[e("nav-list",{attrs:{"current-tab":t.currentTab}}),t._v(" "),e("div",{staticClass:"taoBaoAsk"},[e("div",{staticClass:"btnGroup"},[e("el-row",[e("el-col",{staticClass:"formGroup",staticStyle:{"text-align":"left !important"},attrs:{span:18}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formData.status.value,callback:function(a){t.$set(t.formData.status,"value",a)},expression:"formData.status.value"}},t._l(t.formData.status.options,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),e("el-col",{staticStyle:{"line-height":"40px"},attrs:{span:6}},[e("el-button",{staticClass:"tablebtnActive",on:{click:function(a){return t.queryData("param")}}},[t._v("查询")])],1)],1)],1),t._v(" "),e("div",{staticClass:"btnGroup",staticStyle:{"margin-top":"0","padding-top":"0"}},[e("el-row",[e("el-col",{staticClass:"formGroup",staticStyle:{"text-align":"left !important"},attrs:{span:18}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formData.type_find.value,callback:function(a){t.$set(t.formData.type_find,"value",a)},expression:"formData.type_find.value"}},t._l(t.formData.type_find.options,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),e("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.formData.name,callback:function(a){t.$set(t.formData,"name",a)},expression:"formData.name"}}),t._v(" "),e("span",[t._v("支付时间")]),t._v(" "),e("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.formData.date,callback:function(a){t.$set(t.formData,"date",a)},expression:"formData.date"}})],1),t._v(" "),e("el-col",{staticStyle:{"line-height":"40px"},attrs:{span:6}},[e("el-button",{staticClass:"tablebtnFFF",on:{click:function(a){return t.queryData()}}},[t._v("刷新")])],1)],1)],1),t._v(" "),e("div",{staticClass:"tableCom"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData.data,border:"",height:"400"}},[t._l(t.tableData.columns,function(a,l){return["ordersn"==a.code?[e("el-table-column",{key:l,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},[e("p",[t._v("任务编号: "+t._s(t.tableData.data[a.$index].id))])])]}}],null,!0)})]:"goodMsg"==a.code?[e("el-table-column",{key:l,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},[e("p",[t._v("买号: "+t._s(t.tableData.data[a.$index].taobao))]),t._v(" "),e("p",[t._v("店铺名称："+t._s(t.tableData.data[a.$index].shop_name))]),t._v(" "),e("p",[t._v("商品简称："+t._s(t.tableData.data[a.$index].abbreviation))])])]}}],null,!0)})]:"task3"==a.code?[e("el-table-column",{key:l,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},[t.tableData.data[a.$index].haoping?e("p",[t._v(t._s(t.tableData.data[a.$index].haoping))]):e("p",[t._v("暂未设置提问与回答")])])]}}],null,!0)})]:"status"==a.code?[e("el-table-column",{key:l,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},["0"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("待接手")]):"1"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("进行中")]):"2"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("待发货")]):"3"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("待完成")]):"4"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("已完成")]):"5"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("隐藏中")]):"6"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("已取消")]):e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("未设置评价")]),t._v(" "),e("p",[t._v("支付时间："+t._s(t.tableData.data[a.$index].ct))])])]}}],null,!0)})]:"btn"==a.code?[e("el-table-column",{key:l,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){}}],null,!0)})]:[e("el-table-column",{key:l,attrs:{width:a.width,prop:a.code,label:a.name,align:"center "}})]]})],2),t._v(" "),e("div",{staticClass:"pagination "},[e("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[20],layout:"total, sizes, prev, pager, next, jumper ",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)])],1)},staticRenderFns:[]};var r=e("C7Lr")(s,o,!1,function(t){e("JPTJ")},"data-v-f6a8d9ae",null);a.default=r.exports}});
//# sourceMappingURL=16.e1de4ac265dc578e079f.js.map
webpackJsonp([7],{"8dOp":function(t,a){},O7N2:function(t,a){},ft7i:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("06DN"),l=e("uyiJ"),i=e("3cXf"),s=e.n(i),r={props:{visible:{type:Boolean,default:function(){return!1}},data:{type:Object,default:function(){return{}}}},watch:{visible:function(t){this.dialogShow=t},data:function(t){this.rowData=JSON.parse(s()(t))}},data:function(){return{rowData:{},dialogShow:!1}},methods:{dialogClose:function(){for(var t in this.$emit("dialogClose",!1),this.formData)this.formData[t].check=!1},dialogConfirm:function(){var t=this;this.$ajax.get("ShopMember/sellerRemark",{params:{id:this.data.id,sellerRemark:this.data.sellerRemark}}).then(function(a){a&&a.data&&1===a.data.code&&t.$notify({title:a.data.msg,type:"success"})}),this.$emit("dialogConfirm",{id:this.rowData.id,sellerRemark:this.rowData.sellerRemark}),this.$emit("dialogClose",!1)}}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"settingDialogCom"},[e("el-dialog",{attrs:{title:"修改任务备注",visible:t.dialogShow},on:{"update:visible":function(a){t.dialogShow=a},close:t.dialogClose}},[e("div",{staticClass:"content",staticStyle:{height:"100%",overflow:"inherit"}},[e("el-row",[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:5}},[e("p",[t._v("任务编号：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("p",[t._v(t._s(t.rowData.id))])])],1),t._v(" "),e("el-row",[e("el-col",{staticStyle:{"text-align":"right"},attrs:{span:5}},[e("p",[t._v("任务备注：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("el-input",{attrs:{placeholder:"请输入任务,不超过80字",type:"textarea"},model:{value:t.rowData.sellerRemark,callback:function(a){t.$set(t.rowData,"sellerRemark",a)},expression:"rowData.sellerRemark"}})],1)],1)],1),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.dialogClose}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.dialogConfirm}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var c=e("C7Lr")(r,n,!1,function(t){e("u3C1")},"data-v-e19b8612",null).exports,d={props:{visible:{type:Boolean,default:function(){return!0}},data:{type:Object,default:function(){return{}}}},watch:{visible:function(t){this.dialogShow=t},data:function(t){this.ruleForm.id=t.id}},data:function(){return{fileList:[],allList:[],saveList:[],provinceList:[],cityList:[],disList:[],dialogShow:!1,ruleForm:{type:"",work_type:"",id:"",remark:"",img1:"",img2:"",img3:"",img4:"",img5:""},rules:{type:[{required:!0,message:"请选择工单类型",trigger:"blur"}],work_type:[{required:!0,message:"请选择问题分类",trigger:"blur"}],remark:[{required:!0,message:"请填写备注",trigger:"blur"}]}}},created:function(){},methods:{dialogClose:function(){this.$emit("dialogClose",!1)},submitForm:function(t){var a=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;a.submit()})},submit:function(){var t=this;""!==this.ruleForm.img?this.$ajax.get("shopmember/workorders",{params:{token:this.$getToken(),orderid:this.ruleForm.id,type:this.ruleForm.type,work_type:this.ruleForm.work_type,remark:this.ruleForm.remark,img:this.ruleForm.img1+","+this.ruleForm.img2+","+this.ruleForm.img3+","+this.ruleForm.img4+","+this.ruleForm.img5}}).then(function(a){a&&a.data&&1===a.data.code&&(t.$notify({title:"提交成功",type:"success"}),t.$refs.ruleForm.resetFields(),t.$emit("dialogClose",!1))}):this.$notify.error({title:"请上传图片"})},uploadImg1:function(t){1===t.code?this.ruleForm.img1="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},uploadImg2:function(t){1===t.code?this.ruleForm.img2="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},uploadImg3:function(t){1===t.code?this.ruleForm.img3="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},uploadImg4:function(t){1===t.code?this.ruleForm.img4="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},uploadImg5:function(t){1===t.code?this.ruleForm.img5="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},resetForm:function(t){this.$refs[t].resetFields()}}},u={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"settingDialogCom"},[e("el-dialog",{attrs:{title:"创建客服介入工单",visible:t.dialogShow,width:"50%"},on:{"update:visible":function(a){t.dialogShow=a},close:t.dialogClose}},[e("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",staticStyle:{"padding-bottom":"20px"},attrs:{model:t.ruleForm,rules:t.rules,"label-width":"100px"}},[e("el-form-item",{attrs:{label:"任务编号",prop:"id"}},[e("el-input",{attrs:{disabled:""},model:{value:t.ruleForm.id,callback:function(a){t.$set(t.ruleForm,"id",a)},expression:"ruleForm.id"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"工单类型",prop:"username"}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.ruleForm.type,callback:function(a){t.$set(t.ruleForm,"type",a)},expression:"ruleForm.type"}},[e("el-option",{attrs:{label:"精刷",value:"1"}}),t._v(" "),e("el-option",{attrs:{label:"流量",value:"2"}}),t._v(" "),e("el-option",{attrs:{label:"评价",value:"3"}}),t._v(" "),e("el-option",{attrs:{label:"问问",value:"4"}})],1)],1),t._v(" "),e("el-form-item",{attrs:{label:"问题分类",prop:"work_type"}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.ruleForm.work_type,callback:function(a){t.$set(t.ruleForm,"work_type",a)},expression:"ruleForm.work_type"}},[e("el-option",{attrs:{label:"其他导致卖家损失行为",value:"1"}}),t._v(" "),e("el-option",{attrs:{label:"退款",value:"2"}}),t._v(" "),e("el-option",{attrs:{label:"好评问题",value:"3"}}),t._v(" "),e("el-option",{attrs:{label:"任务过程出错",value:"4"}})],1)],1),t._v(" "),e("div",{staticStyle:{"padding-left":"25px","margin-bottom":"10px"}},[e("label",{staticClass:"el-form-item__label"},[t._v("友情提醒：")]),t._v(" "),e("div",{staticClass:"el-form-item__content"},[e("span",[t._v("请点击【工单处理标准】查看。")])]),t._v(" "),e("p",[e("span",{staticClass:"red"},[t._v("温馨提示：")]),t._v("可上传1~5张图片，图片的大小请控制在3M以内。")])]),t._v(" "),e("el-form-item",{attrs:{label:"图片凭证1",prop:"img1"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.uploadImg1}},[t.ruleForm.img1?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img1}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),e("el-form-item",{attrs:{label:"图片凭证2",prop:"img1"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.uploadImg2}},[t.ruleForm.img2?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img2}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),e("el-form-item",{attrs:{label:"图片凭证3",prop:"img1"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.uploadImg3}},[t.ruleForm.img3?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img3}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),e("el-form-item",{attrs:{label:"图片凭证4",prop:"img1"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.uploadImg4}},[t.ruleForm.img4?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img4}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),e("el-form-item",{attrs:{label:"图片凭证5",prop:"img1"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.uploadImg5}},[t.ruleForm.img5?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img5}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),e("el-form-item",{attrs:{label:"任务编号",prop:"shop_name"}},[e("el-input",{attrs:{type:"textarea"},model:{value:t.ruleForm.remark,callback:function(a){t.$set(t.ruleForm,"remark",a)},expression:"ruleForm.remark"}})],1),t._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.submitForm("ruleForm")}}},[t._v("确认提交")]),t._v(" "),e("el-button",{on:{click:t.dialogClose}},[t._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]},m=e("C7Lr")(d,u,!1,null,null,null).exports,p={props:{visible:{type:Boolean,default:function(){return!1}},data:{type:Object,default:function(){return{}}}},watch:{visible:function(t){this.dialogShow=t},data:function(t){this.rowData=JSON.parse(s()(t))}},data:function(){return{rowData:{},dialogShow:!1}},methods:{dialogClose:function(){for(var t in this.$emit("dialogClose",!1),this.formData)this.formData[t].check=!1},dialogConfirm:function(){this.$emit("dialogConfirm",{id:this.rowData.id,sellerRemark:this.rowData.sellerRemark}),this.$emit("dialogClose",!1)}}},v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"settingDialogCom"},[e("el-dialog",{attrs:{title:"查看任务详情",visible:t.dialogShow,width:"60%"},on:{"update:visible":function(a){t.dialogShow=a},close:t.dialogClose}},[e("div",{staticClass:"content"},[e("h5",[t._v("任务基本信息")]),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("任务分类:")]),t._v(" "),1==t.rowData.type?e("p",[t._v("精刷单")]):t._e(),t._v(" "),2==t.rowData.type?e("p",[t._v("指定推送")]):t._e(),t._v(" "),3==t.rowData.type?e("p",[t._v("复购")]):t._e()]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("订单编号:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.orderid))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("任务编号:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.ordersn))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("任务平台:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.id))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("任务类型:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.type))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("产品价格:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.goodPrice))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("拍下件数:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.goodNumber))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("型号:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.goodSize))])])],1),t._v(" "),e("h5",[t._v("搜索关键字")]),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("关键字（下单）:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.keyword))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("关键字（浏览）:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.keyword1))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("浏览商品价格区间:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.id))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("搜索来路:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.visitWay))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("发货城市:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.shipment))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("价格区间:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.beginPrice)+"--"+t._s(t.rowData.endPrice))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("排序方式:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.sortOrder))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("其他搜索:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.otherCondition))])])],1),t._v(" "),e("h5",[t._v("任务要求")]),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("任务备注:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.sellerRemark))])])],1),t._v(" "),e("h5",[t._v("快递信息")]),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("p",[t._v("运单编号:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.express_sn))])]),t._v(" "),e("el-col",{attrs:{span:12}},[e("p",[t._v("物流公司:")]),t._v(" "),e("p",[t._v("圆通")])])],1),t._v(" "),e("h5",[t._v("商品信息")]),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("p",[t._v("商品全称")]),t._v(" "),e("p",[t._v(t._s(t.rowData.title))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("p",[t._v("商品链接:")]),t._v(" "),e("p",[t._v(t._s(t.rowData.url))])])],1),t._v(" "),e("div",{staticStyle:{"margin-top":"30px"}},[e("span",[t._v("\n          商品展现图:\n        ")]),t._v(" "),e("img",{staticStyle:{width:"60%"},attrs:{src:t.rowData.img}})])],1)])],1)},staticRenderFns:[]};var h=e("C7Lr")(p,v,!1,function(t){e("O7N2")},"data-v-504a9092",null).exports,g={props:{visible:{type:Boolean,default:function(){return!1}},data:{type:Object,default:function(){return{}}}},watch:{visible:function(t){this.dialogShow=t},data:function(t){this.rowData=JSON.parse(s()(t))}},data:function(){return{rowData:{},dialogShow:!1}},methods:{dialogClose:function(){for(var t in this.$emit("dialogClose",!1),this.formData)this.formData[t].check=!1},dialogConfirm:function(){this.$emit("dialogConfirm",{id:this.rowData.id,sellerRemark:this.rowData.sellerRemark}),this.$emit("dialogClose",!1)}}},_={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"settingDialogCom"},[e("el-dialog",{attrs:{title:"查看截图",visible:t.dialogShow},on:{"update:visible":function(a){t.dialogShow=a},close:t.dialogClose}},[e("div",{staticClass:"content"},[e("img",{attrs:{src:t.rowData.divKeyImg}}),t._v(" "),e("img",{attrs:{src:t.rowData.evaluateImg}}),t._v(" "),e("img",{attrs:{src:t.rowData.footImg}}),t._v(" "),e("img",{attrs:{src:t.rowData.goodscollerImg}}),t._v(" "),e("img",{attrs:{src:t.rowData.shopImg}}),t._v(" "),e("img",{attrs:{src:t.rowData.cartImg}}),t._v(" "),e("img",{attrs:{src:t.rowData.askImg}})])])],1)},staticRenderFns:[]};var f=e("C7Lr")(g,_,!1,function(t){e("oF9h")},"data-v-3118d2ac",null).exports,w={props:{visible:{type:Boolean,default:function(){return!1}},data:{type:Object,default:function(){return{}}}},watch:{visible:function(t){this.dialogShow=t},data:function(t){this.rowData=JSON.parse(s()(t))}},data:function(){return{rowData:{},dialogShow:!1}},methods:{dialogClose:function(){for(var t in this.$emit("dialogClose",!1),this.formData)this.formData[t].check=!1},dialogConfirm:function(){this.$emit("dialogConfirm",{id:this.rowData.id,sellerRemark:this.rowData.sellerRemark}),this.$emit("dialogClose",!1)}}},b={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"settingDialogCom"},[e("el-dialog",{attrs:{title:"查看买号信息",visible:t.dialogShow},on:{"update:visible":function(a){t.dialogShow=a},close:t.dialogClose}},[e("div",{staticClass:"content"},[e("el-row",[e("el-col",{attrs:{span:5}},[e("p",[t._v("淘宝会员名：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("p",[t._v(t._s(t.rowData.id))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:5}},[e("p",[t._v("性别：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("p",[t._v(t._s(t.rowData.id))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:5}},[e("p",[t._v("平台注册时间：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("p",[t._v(t._s(t.rowData.id))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:5}},[e("p",[t._v("淘宝等级：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("p",[t._v(t._s(t.rowData.id))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:5}},[e("p",[t._v("天猫等级：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("p",[t._v(t._s(t.rowData.id))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:5}},[e("p",[t._v("购物评级：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("p",[t._v(t._s(t.rowData.id))])])],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:5}},[e("p",[t._v("淘宝成长值：")])]),t._v(" "),e("el-col",{attrs:{span:18}},[e("p",[t._v(t._s(t.rowData.id))])])],1)],1)])],1)},staticRenderFns:[]};var D=e("C7Lr")(w,b,!1,function(t){e("8dOp")},"data-v-4c31ff75",null).exports,k={components:{navList:o.a,tableCom:l.a,editNoteDialog:c,customerDialog:m,checkTaskDetailDialog:h,checkImgDialog:f,checkBuyerMsgDialog:D},created:function(){this.queryData()},data:function(){return{currentTab:"managementFineBrushes",page:1,total:0,rowIndex:0,choiceRowData:{},editDialogShow:!1,customerDialogShow:!1,checkBuyerDialogShow:!1,checkImgDialogShow:!1,checkTaskDialogShow:!1,formData:{type:{value:"",options:[{label:"精刷单任务",value:1},{label:"指定推送",value:2},{label:"复购任务",value:3}]},status:{value:"",options:[{label:"待接手",value:0},{label:"进行中",value:1},{label:"待发货",value:2},{label:"待完成",value:3},{label:"已完成",value:4},{label:"隐藏中",value:5},{label:"已取消",value:6}]},type_find:{value:"",options:[{label:"任务编号",value:1},{label:"运单号",value:2},{label:"店铺名称",value:3},{label:"买号名称",value:4},{label:"商品编号",value:5},{label:"商品简称",value:6}]},payTime:{value:"支付时间",options:[{label:"支付时间",value:"支付时间"},{label:"接手时间",value:"接手时间"},{label:"发布时间",value:"发布时间"},{label:"完成时间",value:"完成时间"}]},name:"",date:""},tableData:{data:[],columns:[{name:"任务分类",code:"type",width:"150"},{name:"任务/订单编号",code:"ordersn",width:"220"},{name:"买号/商品信息",code:"goodMsg",width:""},{name:"商品价格/发布点",code:"price",width:""},{name:"任务状态",code:"status",width:"220"},{name:"操作按钮",code:"btn",width:"100"}]},radio:"1",dialogShow:!1,rules:{sellerRemark:[{required:!0,message:"请选择店铺类型",trigger:"blur"}],paypwd:[{required:!0,message:"请选择掌柜号",trigger:"blur"}]},ruleForm:{sellerRemark:"",paypwd:"",img1:"",img2:"",img3:"",img4:"",img5:""}}},methods:{submit:function(){var t=this,a={token:this.$getToken(),orderid:this.choiceRowData.id,type:this.choiceRowData.type,sellerRemark:this.ruleForm.sellerRemark,paypwd:this.ruleForm.paypwd};"2"===this.radio&&(a.img=this.ruleForm.img1+","+this.ruleForm.img2+","+this.ruleForm.img3+","+this.ruleForm.img4+","+this.ruleForm.img5),this.$ajax.get("shopmember/releaseEvaluate",{params:a}).then(function(a){a&&a.data&&1===a.data.code&&(t.$notify({title:"提交成功",type:"success"}),t.resetForm(),t.dialogShow=!1)})},img1:function(t){console.log(t),1===t.code?this.ruleForm.img1="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},img2:function(t){console.log(t),1===t.code?this.ruleForm.img2="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},img3:function(t){console.log(t),1===t.code?this.ruleForm.img3="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},img4:function(t){console.log(t),1===t.code?this.ruleForm.img4="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},img5:function(t){console.log(t),1===t.code?this.ruleForm.img5="http://h5om.knowsea.cn"+t.data:(this.$notify.error({title:"上传图片失败"}),this.goodsImgList=[])},resetForm:function(){this.$refs.ruleForm.resetFields()},comment:function(t){this.choiceRowData=t,this.dialogShow=!0},editNote:function(t){this.rowIndex=t,this.choiceRowData=this.tableData.data[t],this.editDialogShow=!0},editDialogClose:function(){this.editDialogShow=!1},editDialogConfirm:function(t){this.editDialogShow=!1,this.choiceRowData.sellerRemark=t.sellerRemark},customerIn:function(t){this.rowIndex=t,this.choiceRowData=this.tableData.data[t],this.customerDialogShow=!0},customerDialogClose:function(){this.customerDialogShow=!1},customerDialogConfirm:function(t){this.customerDialogShow=!1},checkBuyerMsg:function(t){this.rowIndex=t,this.choiceRowData=this.tableData.data[t],this.checkBuyerDialogShow=!0},checkBuyerDialogClose:function(){this.checkBuyerDialogShow=!1},checkBuyerDialogConfirm:function(t){this.checkBuyerDialogShow=!1},checkImg:function(t){this.rowIndex=t,this.choiceRowData=this.tableData.data[t],this.checkImgDialogShow=!0},checkImgDialogClose:function(){this.checkImgDialogShow=!1},checkImgDialogConfirm:function(t){this.checkImgDialogShow=!1},checkTaskDetail:function(t){this.rowIndex=t,this.choiceRowData=this.tableData.data[t],this.checkTaskDialogShow=!0},checkTaskDialogClose:function(){this.checkTaskDialogShow=!1},checkTaskDialogConfirm:function(t){this.checkTaskDialogShow=!1},handleCurrentChange:function(t){this.page=t,this.queryData("param")},queryData:function(t){var a=this,e={params:{token:this.$getToken()}};t&&(e={params:{token:this.$getToken(),page:this.page,type:this.formData.type.value,status:this.formData.status.value,type_find:this.formData.type_find.value,start:this.formData.date[0],end:this.formData.date[1]}}),this.$ajax.get("shopmember/releaseList",e).then(function(t){t&&t.data&&1===t.data.code&&(a.tableData.data=t.data.data.data,a.total=t.data.data.total)})},cancelTask:function(t){var a=this;this.$confirm("确认取消？").then(function(e){a.$ajax.get("shopmember/canceRelease?id="+t.id).then(function(t){t&&t.data&&1===t.data.code&&(a.queryData(),a.$notify({title:"取消成功",type:"success"}))})}).catch(function(t){}),console.log(t)}}},y={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"taskManagement"},[e("nav-list",{attrs:{"current-tab":t.currentTab}}),t._v(" "),e("div",{staticClass:"publicFineBrushes"},[e("div",{staticClass:"formGroup"},[e("el-row",[e("el-col",{staticStyle:{"text-align":"left"},attrs:{span:12}},[e("el-select",{attrs:{placeholder:"任务类型"},model:{value:t.formData.type.value,callback:function(a){t.$set(t.formData.type,"value",a)},expression:"formData.type.value"}},t._l(t.formData.type.options,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),e("el-select",{attrs:{placeholder:"任务状态"},model:{value:t.formData.status.value,callback:function(a){t.$set(t.formData.status,"value",a)},expression:"formData.status.value"}},t._l(t.formData.status.options,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),e("el-select",{attrs:{placeholder:"搜索类型"},model:{value:t.formData.type_find.value,callback:function(a){t.$set(t.formData.type_find,"value",a)},expression:"formData.type_find.value"}},t._l(t.formData.type_find.options,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),e("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.formData.name,callback:function(a){t.$set(t.formData,"name",a)},expression:"formData.name"}})],1),t._v(" "),e("el-col",{attrs:{span:12}},[e("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.formData.date,callback:function(a){t.$set(t.formData,"date",a)},expression:"formData.date"}})],1)],1)],1),t._v(" "),e("div",{staticClass:"btnGroup"},[e("el-button",{staticClass:"tablebtnActive",on:{click:function(a){return t.queryData("param")}}},[t._v("查询")]),t._v(" "),e("el-button",{staticClass:"tablebtnFFF",on:{click:function(a){return t.queryData()}}},[t._v("刷新")])],1),t._v(" "),e("div",{staticClass:"tableCom"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData.data,border:"",height:"400"}},[t._l(t.tableData.columns,function(a,o){return["type"==a.code?[e("el-table-column",{key:o,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},[1==t.tableData.data[a.$index].type?e("p",[t._v("精刷单任务")]):t._e(),t._v(" "),2==t.tableData.data[a.$index].type?e("p",[t._v("指定推送")]):t._e(),t._v(" "),3==t.tableData.data[a.$index].type?e("p",[t._v("复购任务")]):t._e()])]}}],null,!0)})]:"ordersn"==a.code?[e("el-table-column",{key:o,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},[e("p",[t._v("任务编号: "+t._s(t.tableData.data[a.$index].id))]),t._v(" "),e("p",{staticClass:"red"},[t._v("(淘宝APP自然搜索)")]),t._v(" "),t.tableData.data[a.$index].ordersn?e("p",[t._v("订单编号："+t._s(t.tableData.data[a.$index].ordersn))]):t._e(),t._v(" "),t.tableData.data[a.$index].express_sn?e("p",[t._v("圆通快递："+t._s(t.tableData.data[a.$index].express_sn))]):t._e()])]}}],null,!0)})]:"goodMsg"==a.code?[e("el-table-column",{key:o,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},[e("p",[t._v("买号: "+t._s(t.tableData.data[a.$index].taobao))]),t._v(" "),e("p",[t._v("店铺名称："+t._s(t.tableData.data[a.$index].shop_name))]),t._v(" "),e("span",{staticStyle:{color:"#4292b9",cursor:"pointer"},on:{click:function(e){return t.checkTaskDetail(a.$index)}}},[t._v("查看任务详情")]),t._v(" "),e("span",{staticStyle:{color:"#4292b9",cursor:"pointer"},on:{click:function(e){return t.editNote(a.$index)}}},[t._v("修改备注")])])]}}],null,!0)})]:"price"==a.code?[e("el-table-column",{key:o,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},[e("p",[t._v("商品单价: "+t._s(t.tableData.data[a.$index].goodPrice)+"元")]),t._v(" "),e("p",[t._v("任务总价："+t._s(t.tableData.data[a.$index].goodPrice*t.tableData.data[a.$index].goodNumber+t.tableData.data[a.$index].courierFee)+"元")]),t._v(" "),e("p",[t._v("发布点："+t._s(t.tableData.data[a.$index].MinLi/100)+"个")]),t._v(" "),e("p",[t._v("置顶费用："+t._s(t.tableData.data[a.$index].zdfee/100)+"元")])])]}}],null,!0)})]:"status"==a.code?[e("el-table-column",{key:o,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"tableCellMsg"},["0"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("待接手")]):t._e(),t._v(" "),"1"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("进行中")]):t._e(),t._v(" "),"2"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("待发货")]):t._e(),t._v(" "),"3"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("待完成")]):t._e(),t._v(" "),"4"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("已完成")]):t._e(),t._v(" "),"5"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("隐藏中")]):t._e(),t._v(" "),"6"==t.tableData.data[a.$index].status?e("p",{staticStyle:{"text-align":"center",color:"rgb(12, 185, 229)",cursor:"pointer"}},[t._v("已取消")]):t._e(),t._v(" "),e("p",[t._v("发布时间："+t._s(t.tableData.data[a.$index].ct))]),t._v(" "),e("p",[t._v("接手时间："+t._s(t.tableData.data[a.$index].taskfristTime))])])]}}],null,!0)})]:"btn"==a.code?[e("el-table-column",{key:o,attrs:{width:a.width,prop:a.code,label:a.name,align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[6!=t.tableData.data[a.$index].status?e("el-button",{staticStyle:{"border-radius":"25px",cursor:"pointer"},attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.customerIn(a.$index)}}},[t._v("客服介入")]):t._e(),t._v(" "),t.tableData.data[a.$index].status>1&&6!=t.tableData.data[a.$index].status?e("el-button",{staticStyle:{"border-radius":"25px","margin-left":"0","margin-top":"5px",cursor:"pointer"},attrs:{type:"warning",size:"mini"},on:{click:function(e){return t.checkImg(a.$index)}}},[t._v("查看截图")]):t._e(),t._v(" "),"0"==t.tableData.data[a.$index].status?e("el-button",{staticStyle:{"border-radius":"25px","margin-left":"0","margin-top":"5px",cursor:"pointer"},attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.cancelTask(t.tableData.data[a.$index])}}},[t._v("取消任务")]):t._e(),t._v(" "),"4"==t.tableData.data[a.$index].status&&"0"==t.tableData.data[a.$index].evaluate?e("el-button",{staticStyle:{"border-radius":"25px","margin-left":"0","margin-top":"5px",cursor:"pointer"},attrs:{type:"success",size:"mini"},on:{click:function(e){return t.comment(t.tableData.data[a.$index])}}},[t._v("评价")]):t._e()]}}],null,!0)})]:[e("el-table-column",{key:o,attrs:{width:a.width,prop:a.code,label:a.name,align:"center "}})]]})],2),t._v(" "),e("div",{staticClass:"pagination "},[e("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[20],layout:"total, sizes, prev, pager, next, jumper ",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),e("edit-note-dialog",{attrs:{data:t.choiceRowData,visible:t.editDialogShow},on:{dialogClose:t.editDialogClose,dialogConfirm:t.editDialogConfirm}}),t._v(" "),e("customer-dialog",{attrs:{data:t.choiceRowData,visible:t.customerDialogShow},on:{dialogClose:t.customerDialogClose,dialogConfirm:t.customerDialogConfirm}}),t._v(" "),e("check-buyer-msg-dialog",{attrs:{data:t.choiceRowData,visible:t.checkBuyerDialogShow},on:{dialogClose:t.checkBuyerDialogClose,dialogConfirm:t.checkBuyerDialogConfirm}}),t._v(" "),e("check-img-dialog",{attrs:{data:t.choiceRowData,visible:t.checkImgDialogShow},on:{dialogClose:t.checkImgDialogClose,dialogConfirm:t.checkImgDialogConfirm}}),t._v(" "),e("check-task-detail-dialog",{attrs:{data:t.choiceRowData,visible:t.checkTaskDialogShow},on:{dialogClose:t.checkTaskDialogClose,dialogConfirm:t.checkTaskDialogConfirm}})],1),t._v(" "),e("div",{staticClass:"settingDialogCom"},[e("el-dialog",{staticStyle:{"margin-top":"20px"},attrs:{title:"添加商品",visible:t.dialogShow,width:"60%"},on:{"update:visible":function(a){t.dialogShow=a}}},[e("div",[t._v("选择评价类型:\n        "),e("el-radio",{attrs:{label:"1"},model:{value:t.radio,callback:function(a){t.radio=a},expression:"radio"}},[t._v("文字好评\n          "),e("span",{staticClass:"red"},[t._v("1.5")]),t._v("个发布点")]),t._v(" "),e("el-radio",{attrs:{label:"2"},model:{value:t.radio,callback:function(a){t.radio=a},expression:"radio"}},[t._v("晒图好评\n          "),e("span",{staticClass:"red"},[t._v("2.5")]),t._v("个发布点")])],1),t._v(" "),e("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"140px"}},[e("el-form-item",{attrs:{label:"设置评价内容",prop:"sellerRemark"}},[e("el-input",{attrs:{type:"textarea"},model:{value:t.ruleForm.sellerRemark,callback:function(a){t.$set(t.ruleForm,"sellerRemark",a)},expression:"ruleForm.sellerRemark"}})],1),t._v(" "),"2"==t.radio?e("el-form-item",{attrs:{label:"上传图片1",prop:"img1"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.img1}},[t.ruleForm.img1?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img1}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):t._e(),t._v(" "),"2"==t.radio?e("el-form-item",{attrs:{label:"上传图片2",prop:"img2"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.img2}},[t.ruleForm.img2?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img2}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):t._e(),t._v(" "),"2"==t.radio?e("el-form-item",{attrs:{label:"上传图片3",prop:"img3"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.img3}},[t.ruleForm.img3?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img3}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):t._e(),t._v(" "),"2"==t.radio?e("el-form-item",{attrs:{label:"上传图片4",prop:"img4"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.img4}},[t.ruleForm.img4?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img4}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):t._e(),t._v(" "),"2"==t.radio?e("el-form-item",{attrs:{label:"上传图片5",prop:"img5"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://h5om.knowsea.cn/shop/Upload/uploadFile","show-file-list":!1,"on-success":t.img5}},[t.ruleForm.img5?e("img",{staticClass:"avatar",attrs:{src:t.ruleForm.img5}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1):t._e(),t._v(" "),e("el-form-item",{attrs:{label:"身份验证",prop:"paypwd"}},[e("el-input",{model:{value:t.ruleForm.paypwd,callback:function(a){t.$set(t.ruleForm,"paypwd",a)},expression:"ruleForm.paypwd"}})],1),t._v(" "),e("div",{staticStyle:{"text-align":"center","margin-bottom":"50px"}},[e("el-button",{attrs:{type:"primary"},on:{click:function(a){t.dialogShow=!1}}},[t._v("取消")]),t._v(" "),e("el-button",{on:{click:function(a){return t.submit()}}},[t._v("确定")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var C=e("C7Lr")(k,y,!1,function(t){e("lLys")},"data-v-528ab07b",null);a.default=C.exports},lLys:function(t,a){},oF9h:function(t,a){},u3C1:function(t,a){}});
//# sourceMappingURL=7.9aa46389d00279ac6013.js.map
var state = {
  goods: {
    releaseFlowList: [
        {
            flowList: {
              value: "",
              options: [
                { label: "APP自然搜索", value: 1 },
                { label: "APP淘口令", value: 2 },
                { label: "PC直通车", value: 3 },
                { label: "APP二维码", value: 4 },
                { label: "PC自然搜索", value: 5 },
                { label: "APP直通车", value: 6 }
              ]
            },
            flowid:'',
            keyword1: "",
            keyword: "",
            taskNum: "",
            sortOrder: "", // 排序方式(综合，销量，价格高到低，价格低到高)
            beginPrice: "", // 价格区间起始
            endPrice: "", // 价格区间最大值
            shipment: "", // 发货地
            otherCondition: "" // 其他
          }
    ], //来路设置
    sellerRemark: '', //备注信息
    releaseDateList: [{
      "taskNum": '',
      "beginTime": "",
      "endTime": "",
      "tiemout": "",
      "releaseDay": ""
    }], //发布时间
    paypwd: '', //支付密码
    goodsid: '', //商品id
    releasePriceList: [{
      "goodSize": "",
      "goodPrice": 0,
      "goodNumber": 0,
      "courierFee": 0,
      "taskNum": 0
    }], //商品价格、数量、规格、快递费等
    type: '', //任务类型，1精刷，2推送，3复购,
    expressType: '', //是否平台代发，1要，0不要
    zdfee: '' //置顶费，单位分
  },
  goodsInfo:{},
  taskTotle:'',
  date:{}
}
export default state;

import Vue from 'vue'
let percent = value => {
  return value.toFixed(2)
  // return (Math.floor(value * 1000) / 1000 )*100
}
let member = value => {
    if(value==1){
        return 1
    }else if(value==4){
        return 317
    }else{
        return 0
    }
}
let qishu = num => {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  let res = overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  if (num == 10) {
    return '第十期'
  }
  let pri = '第' + res + '期'
  return pri
}

// Vue.filter('percent',percent)
// Vue.filter('qishu',qishu)
function add0(m) {
  return m < 10 ? '0' + m : m
}
let format = (shijianchuo) => {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo*1000);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}


export {
  percent,
  qishu,
  format,
  member
}

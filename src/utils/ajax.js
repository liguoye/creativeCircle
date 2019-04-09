/**
 * axios 插件
 * author : oscar 2017
 * */

import Vue from 'vue';
import axios from 'axios'
import Router from '../router/index'
import Qs from 'qs'
let vm = new Vue()

export default {
  install: function () {
    let url = 'shop/',
      version = 'v1/';
    var instance = axios.create({
      // baseURL: 'http://onebi.ifbplus.com/' + url,
      baseURL: 'http://h5om.knowsea.cn/' + url,
      timeout: 10000,
      // 格式化参数
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }],
      params: {
        token: vm.$getToken()
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // 格式化输出
      transformResponse(data) {
        let rs = JSON.parse(data);
        // console.log(rs.code)
        
        if (rs && rs.code == '-1') {
            vm.$notify.error({
              title: '登陆过期',
            });
            setTimeout(()=>{
                 Router.push('/login')
            },1000)
            return false
          }

        if (rs && rs.code !== 1) {
          vm.$notify.error({
            title: '错误',
            message: rs.msg
          });

        }

        // console.log(rs);
        // if(rs && rs.body ){
        //     if(rs.body && rs.body.message){
        //         return rs.body.message;
        //     }
        //     return rs.body;
        // }
        return rs;
      },
      paramsSerializer(params) {
        return Qs.stringify(params)
      },
    });
    Vue.prototype.$ajax = instance;
  }
};

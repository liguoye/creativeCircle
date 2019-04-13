
import cookie from 'js-cookie'
import Router from '../router/index'
import Vue from 'vue';
let vm = new Vue()

function getToken(){
    let token=cookie.get('token')||'';
    if(!token){
        vm.$notify.error({
            title: '错误',
            message: '登陆过期，请重新登陆'
          });
          Router.push('/login')
        return
    }
    return token
}


Vue.prototype.$getToken = getToken;


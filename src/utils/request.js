import axios from 'axios'
import router from "@/router";
import Cookies from 'js-cookie'
const request = axios.create({
    baseURL: 'http://localhost:9090/api',//全局加上api前缀
    timeout: 5000
})

// 请求发送前做处理
// 例如加token，加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    const adminJson = Cookies.get('admin')
    if (adminJson) {
        // 设置请求头
        config.headers['token'] = JSON.parse(adminJson).token
    }
    return config
}, error => {
    return Promise.reject(error)
});
// request 拦截器
request.interceptors.response.use(
        response => {
        let res = response.data;
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 无权限访问
        if (res.code === '401') {
            console.log("401")
            router.push('/login')
        }
        return res;
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)
export default request
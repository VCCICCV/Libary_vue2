import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:9090',//全局加上api前缀
    timeout: 5000
})
// request 拦截器
// 请求发送前做处理
// 例如加token，加密
request.interceptors.request.use(config => {
    // 请求头
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    return config
}, error => {
    return Promise.reject(error)
});
request.interceptors.response.use(
        response => {
        let res = response.data;
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)
export default request
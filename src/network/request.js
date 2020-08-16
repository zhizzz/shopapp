import axios from "axios";

export function request(config) {
    //创建axios实例
    const instance = axios.create({
        baseURL: "http://152.136.185.210:8000/api/z8",
        timeout: 8000
    });

    // 请求拦截器
    instance.interceptors.request.use(
        config => {
            return config
        },
        err => {
            console.log(err)
        }
    )

    instance.interceptors.response.use(
        response => {
            let res = {}
            res.status = response.status
            res.data = response.data
            return res
        },
        err => {
            console.log(err)
        }
    )
    return instance(config);

}

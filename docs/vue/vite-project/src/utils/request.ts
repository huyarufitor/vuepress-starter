import type { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios'
import axios from 'axios'
// import { ElMessage } from 'element-plus'
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API as string,
    timeout: 5000,
    headers: {},
    withCredentials: true
})
console.log('VITE_BASE_API', import.meta.env);
// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {
        // if (store.getters.token) {
        // config.headers['X-Token'] = getToken()
        // }
        console.log('config', config);
        return config
    },
    (error: AxiosError) => {
        console.log('error', error);
        return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if(response.status === 200){
            const {code,message} = response.data
            if(code !== 200){
                console.error(message)
                // ElMessage.error(message)
            }
            return response.data ||{}
        }else{
            console.log('服务端异常');
            Promise.reject(new Error('服务端异常'))
        }
    },
    (
        (error: AxiosError)=>{  
            if(error?.response?.status === 401){
                return {data:{code:401,message:'请重新登录'}}
            }
        }
    )
)
export default service
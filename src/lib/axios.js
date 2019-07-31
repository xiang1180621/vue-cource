import axios from 'axios'
import { baseURL } from '@/config'
import { getToken } from '@/lib/util'

class HttpRequest {
  //相当于类的构造函数，是必须要的
  constructor (baseUrl = baseURL) {
    //this指代要创建的实例，当new一个实例时，会把this传进去
    this.baseUrl = baseUrl
    this.queue = {}
  }
  //返回一个内部配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  distroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    //请求拦截器，传入两个回调函数
    instance.interceptors.request.use(config => {
      // 可添加请求前的控制，比如添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show()  这是一个全局的loading
      }
      this.queue[url] = true
      config.headers['Authorization'] = getToken()
      return config
    }, error => {
      //返回错误信息
      return Promise.reject(error)
    })
    //响应拦截器
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const { data } = res
      return data
    }, error => {
      this.distroy(url)
      return Promise.reject(error.response.data)
    })
  }
  request (options) {
    //创建一个实例
    const instance = axios.create()
    //将两个配置对象合并为一个，如果有相同配置会用后面覆盖前面的
    options = Object.assign(this.getInsideConfig(), options)
    //添加一个拦截器
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest

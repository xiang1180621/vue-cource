import Mock from 'mockjs'
import { getUserInfo, login, authorization } from './response/user'
import { getTableData, getFileList, getFolderList } from './response/data'
const Random = Mock.Random

//配置拦截器(url或者正则表达式,method,func) func:表示拦截请求后作出响应的方法
Mock.mock(/\/getUserInfo/, 'post', getUserInfo)
Mock.mock(/\/login/, 'post', login)
Mock.mock(/\/authorization/, 'get', authorization)
Mock.mock(/\/getTableData/, 'get', getTableData)
Mock.mock(/\/getFileList/, 'get', getFileList)
Mock.mock(/\/getFolderList/, 'get', getFolderList)

Mock.setup({
  timeout: 0
})

Random.extend({
  fruit () {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit)
  }
})

export default Mock

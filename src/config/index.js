export const baseURL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : ''
//如果代理已经配置了服务端地址，此处可以不用配置，如果没有此处可添加服务端地址

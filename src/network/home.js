import {request} from './request';
//获取轮播图和推荐圆图
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
        // method:'get'
    })
}
//获取商品列表
export function getHomeProductList(type, page) {
    return request({
      url: '/home/data',
      params: {
        type,
        page
      }
    })
  }
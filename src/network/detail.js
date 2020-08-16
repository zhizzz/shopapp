import {request} from './request'
export function getDetailData(iid){
     return request({
         url:'detail',
         params:{
             iid
         }
     })
}

export function getRecommend(){
  return request({
    url:'recommend'
  })
}

export class BaseInfo {
    //constructor 属性返回对创建此对象的数组函数的引用。
    //商品基本信息数据整合
    constructor(itemInfo, columns, services) {
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.columns = columns;
      this.services = services;
      this.nowPrice = itemInfo.lowNowPrice;
      this.price = itemInfo.price
    }
  }

  export class Shop {
    //店铺信息
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }
  //商品参数
  export class Params {
    constructor(info, rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }

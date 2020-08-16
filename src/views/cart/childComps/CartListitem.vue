<template>
  <div id="cart-list">
    <div class="cart-check">
      <cart-check @click.native="checkClick" :isCheck="product.isCheck"></cart-check>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">¥{{product.price}}</div>
        <div class="item-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CartCheck from "./CartCheck";
export default {
  name: "CartListitem",
  components: {
    CartCheck
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    checkClick() {
      this.product.isCheck = !this.product.isCheck
    }
  }
};
</script>
<style scoped>
#cart-list {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .cart-check {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 20px;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 5px;
    left: 8px;
    right: 15px;
    display: flex;
    justify-content:space-between;
   
    
  }
  .info-bottom .item-price {
    color: orangered;
  }
</style>
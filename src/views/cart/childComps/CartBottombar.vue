<template>
  <div class="bottom-menu">
    <cart-check class="select-all" :isCheck="isSelect" @click.native="selectAll"></cart-check>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{cartCount}})</span>
  </div>
</template>
<script>
import CartCheck from "./CartCheck";
export default {
  name: "CartBottombar",
  components: {
    CartCheck
  },
  data() {
    return {
      cartList: this.$store.state.cartList
    };
  },
  methods: {
    selectAll() {
      if (this.isSelect) {
        this.cartList.forEach(item => (item.isCheck = false));
      } else {
        this.cartList.forEach(item => (item.isCheck = true));
      }
    },
    calcClick(){
      if (!this.cartCount) {
          this.$toast.show('选择购买的商品', 2000)
        }
    }
  },
  computed: {
    totalPrice() {
      return this.cartList
        .filter(item => {
          return item.isCheck; //isCheck为true才加进来
        })
        .reduce((prePrice, item) => {
          return prePrice + item.count * item.price; //将价格相加，初始化为0
        }, 0)
        .toFixed(2);
    },
    cartCount() {
      return this.cartList.filter(item => item.isCheck).length;
    },
    isSelect() {
      //1.filter方法，当选中长度为0时,!0 == true，当选中长度大于0时，！num都会返回false
      //   return !(this.cartList.filter(item=>!item.isCheck).length)
      //没有商品时，返回false
      if (this.cartList.length === 0) return false;
      //2.find方法,没有选中时,返回true !true=false
      return !this.cartList.find(item => !item.isCheck);
    }
  }
};
</script>
<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}
.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
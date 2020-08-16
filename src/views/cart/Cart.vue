<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{cartlength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
    <cart-list/>
    </scroll>
    <cart-bottombar/>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import NavBar from "components/common//navbar/NavBar";
import CartList from './childComps/CartList';
import CartBottombar from './childComps/CartBottombar'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottombar
  },
  data() {
    return {};
  },
  computed: {
    cartlength() {
      return this.$store.state.cartList.length;
      //要是需要多次使用可以在stroe里创建一个getters.js文件，然后使用...mapGetters(['cartlength'])方法
      //需要引入{mapGetters} from 'vuex'
    },
  },
   activated() {
       //防止添加购物车时不会滚动的问题
       this.$refs.scroll.refresh()
   },
};
</script>
<style scoped>
.cart{
    height: 100vh;
}
.navbar{
    background: var(--color-text);
    color: #fff;
}
.content{
    height: calc(100% - 44px - 49px - 45px);
    overflow: hidden;
}
</style>
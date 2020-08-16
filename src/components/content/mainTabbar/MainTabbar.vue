<template>
<div>
    <tab-bar>
      <tabbar-item path="/home" activeColor="#0997F7">
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </tabbar-item>
      <tabbar-item path="/category" activeColor="#0997F7">
        <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </tabbar-item>
      <tabbar-item path="/cart" activeColor="#0997F7">
        <img src="~assets/img/tabbar/cart.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/cart_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </tabbar-item>
      <tabbar-item path="/profile" activeColor="#0997F7">
        <img src="~assets/img/tabbar/user.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/user_active.svg" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </tabbar-item>
    </tab-bar>
    </div>
</template>
<script>
import TabBar from 'components/common/tabbar/Tabbar'
import TabbarItem from 'components/common/tabbar/TabbarItem'
export default {
    name:'MainTabbar',
    components:{
        TabBar,
        TabbarItem
    }
}
</script>
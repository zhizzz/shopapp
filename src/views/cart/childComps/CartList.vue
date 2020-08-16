<template>
    <div class="cart-list">
     <cart-listitem v-for="(item,index) in cartList" :key="index" :product="item"/>
    </div>
</template>
<script>
import CartListitem from './CartListitem'
export default {
    name:'CartList',
    components:{
        CartListitem
    },
    data() {
        return {
            
        }
    },
    computed: {
         cartList(){
        return this.$store.state.cartList
    }
    },
}
</script>
<style scoped>

</style>
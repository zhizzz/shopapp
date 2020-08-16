<template>
    <div class="cart-check">
        <img src="~assets/img/cart/select.svg" alt="" v-if="!isCheck">
        <img src="~assets/img/cart/select_active.svg" alt="" v-else>
    </div>
</template>
<script>
export default {
    name:'CartCheck',
    props:{
        isCheck:{
            type:Boolean,
            default:false
        }
    },
}
</script>
<style scoped>
.cart-check img{
    width: 18px;
    height: 18px;
}
</style>


<template>
    <div class="productlist">
        <productlist-item v-for="(item,index) in productlist" :key="index" :plItem="item"/>
    </div>
</template>
<script>
import ProductlistItem from './ProductlistItem';
export default {
    components:{
       ProductlistItem
    },
    props:{
        productlist:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style scoped>
.productlist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>
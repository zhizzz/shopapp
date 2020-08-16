<template>
    <div id="tab-bar">
       <slot></slot>
    </div>
</template>
<script>
export default {
    name:'Tabbar'
}
</script>
<style scoped>
#tab-bar{
   display: flex;
   background: #f2f2f2;
   position: fixed;
   right: 0;
   left: 0;
   bottom: 0;
   text-align: center;
   box-shadow: 0 -1px 1px rgba(100, 100, 100, .1);
 }
 
</style>

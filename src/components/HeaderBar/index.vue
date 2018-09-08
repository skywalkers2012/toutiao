<template>
    <section class="head df-sb">
        <div class="left">  
            <slot name='left'>
               <mu-icon value=":icon-back"  @click="goBack($router)" size="30"></mu-icon> 
            </slot>
        </div>
        <div class="title">
            <slot></slot>
        </div>
        <div class="right">
            <slot name="right"></slot> 
        </div>
    </section>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.head {
    width: 100%;
    height: 0.5rem;
    position: relative;
    background-color: #fff;
    .title {
        width:100%;
        font-size: 0.18rem;
        text-align: center;
        color: #555;
    }
    .left {
        position: absolute;
        left: 0.1rem;
    }
    .right {
        position: absolute;
        right:0.1rem;
    }
}
</style>
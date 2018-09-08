<template>
    <section class="head df-sb">
        <div class="left" ref="left">  
            <slot name='left'>
             <mu-icon value=":icon-back"  @click="goBack($router)" size="30"></mu-icon> 
         </slot>
     </div>
     <div class="center" ref="center" >
        <slot name='center'></slot>
    </div>
    <div class="title">
        <slot></slot>
    </div>
    <div class="right" ref="right">
        <slot name="right"></slot> 
    </div>
</section>
</template>
<script>
export default {
    mounted(){
        var left=this.$refs.left.getBoundingClientRect().width;
        var right=this.$refs.right.getBoundingClientRect().width;
        var center="left:"+left+"px; width:calc(100% - "+(left+right)+'px)';
        this.$refs.center.style=center;
    }
}
</script>
<style lang="less" scoped>
.head {
    width: 100%;
    height: 0.5rem;
    position: relative;
    background-color: #fff;
    .center {
        position:absolute;
        color: #555;
    }
    .title{
        width:100%;
        font-size: 0.18rem;
        text-align: center;
        color: #555;
    }
    .left {
        position: absolute;
        left: 10px;
    }
    .right {
        position: absolute;
        right:10px;
    }
}
</style>
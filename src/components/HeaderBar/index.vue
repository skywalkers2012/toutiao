<template>
    <section class="head">
        <mu-icon value=":icon-back" class="back" @click="goBack($router)" size="30"></mu-icon>
        <h2>{{title}}</h2>
        <slot name="right"></slot>  
    </section>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: 'skywalker'
        }
    }
}
</script>
<style lang="less" scoped>
.head {
    width: 100%;
    height: 0.5rem;
    position: relative;
    background-color: #fff;
    svg {
        font-size: 0.25rem;
    }
    h2 {
        height: 100%;
        line-height: 0.5rem;
        font-size: 0.18rem;
        text-align: center;
        color: #555;
    }
    .back {
        position: absolute;
        left: 0.1rem;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
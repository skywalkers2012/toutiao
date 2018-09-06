<template>
	<section class="footer-wrap">
		<mu-bottom-nav :value="$store.state.user.footBarSelectIndex" >
			<mu-bottom-nav-item :title="item.title" :value='item.path' :icon="iconName(item)" v-for='(item,index) in footerBarList' :key='index' :to='item.path' exact-active-class="active"></mu-bottom-nav-item>
		</mu-bottom-nav>
	</section>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
	computed:{
		...mapGetters(['footerBarList']),
		iconName(){
			return function(item) {
				return (this.$route.matched[0].path||this.$route.matched[1].path)===item.path?`:icon-${item.icon}-active`:`:icon-${item.icon}`
			}
		}
	}
}
</script>

<style lang='less' scoped>

.footer-wrap{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 99;
	background-color: #fff;
	font-size: 12px;
	line-height: 1;
}

.active {
	color: red;
}


</style>
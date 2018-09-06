<template>
	<div class="app-wrap">
		<headerBar></headerBar>
		<transition mode="out-in">
			<router-view class='app-container'></router-view>
		</transition>
		<footerBar></footerBar>
	</div>
</template>

<style lang='less' scoped>
.app-wrap{
	width: 100%;
	height: 100%;
}
.app-container {
	width: 100%;
	height: calc(100% - 1rem);
	position: relative;
}

</style>

<script>
import headerBar from './headerBar'
import footerBar from './footerBar'

export default {
	name:'layout',
	components:{
		headerBar,
		footerBar
	}
}
</script>
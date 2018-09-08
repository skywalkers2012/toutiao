<template>		
	<article class="account-wrap">
		<div class="content">
			<accountHeader @showLogin='showLogin=true' class='account-head'></accountHeader>
			<accountBody class='account-body'></accountBody>
		</div>
		<footBar></footBar>
		<transition enter-active-class='animated slideInUp' leave-active-class='animated slideOutDown'>
			<loginForm v-show='showLogin' class='loginForm' @closeLogin='showLogin=false'></loginForm>
		</transition>
	</article>
</template>

<script>

import footBar from '@/pages/layout/footerBar'
import loginForm from '@/components/Login/index'
import accountHeader from './head/index'
import accountBody from './body/index'
import {mapGetters} from 'vuex'

export default{
	data(){
		return {
			showLogin:false
		}
	},
	components:{
		footBar,
		loginForm,
		accountHeader,
		accountBody
	}
}
</script>

<style lang='less' scoped>
.account-wrap{
	overflow: hidden;
	.content {
		overflow: auto;
		height: calc(100% - 0.4rem);
		.account-head{
			height: 1.6rem;
		}
		.account-body{
			height: calc(100% - 1.6rem);
			background-color: white;
		}
	}
	.content::-webkit-scrollbar {
		display: none;
	}
	.loginForm {
		position: absolute;
		top: 0.2rem;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background-color: #FAFAFA;
	}
}
</style>
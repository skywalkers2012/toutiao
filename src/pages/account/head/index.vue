<template>
	<section class="wrap">
		<div class="head " v-if='isLogin'>
			<div class="top df-sb">
				<div class="left">
						<mu-avatar size='64'>
							<img src="~@/../static/img/avatar.png">
						</mu-avatar>
				</div>
				<div class="name">
					<div>{{name}}</div>
					<mu-button round small color="#FC8E04">申请认证</mu-button>	
				</div>
				<div class="df-sa" style='font-size:0.12rem;padding-right:0.2rem'>
					<div>
						<mu-icon value=':icon-yuedu' color='#FC8E04'></mu-icon>
					</div>
					<div>
						<div>今日阅读</div>
						<div>45分钟</div>
					</div>
				</div>
			</div>
			<div class="middle df-sa">
				<div v-for='(item,index) in user.userInfo' class="line">
					<div>{{item.num}}</div>
					<div>{{item.title}}</div>
				</div>
			</div>
		</div>
		<div class="head" v-else>
			<span class='df-sa nologinhit'>登录推荐更精准</span>
			<div class='df-sa login'>
				<div v-for='(item,index) in user.loginType' @click="$emit('showLogin')">
					<mu-avatar size='70' color="white">
						<img :src="`~@/../static/img/${item}`">
					</mu-avatar>
				</div>	
			</div>
			<div class="df-c" style='font-size:0.12rem'>
				<span>
					<mu-icon value=':icon-yuedu' color='#FC8E04'></mu-icon>
				</span>
				<span>
					<span>今日阅读</span>
					<span>45分钟</span>
				</span>
			</div>
		</div>
	</section>
</template>

<script>

import {mapGetters} from 'vuex'
import {Cookie} from '@/../static/utils/storage'

export default{
	data(){
		return {
			name:'skywalker'
		}
	},
	computed:{
		isLogin(){
			return this.$store.state.user.isLogin||Cookie.get('user_userName').length>0;	
		},
		...mapGetters(['user'])
	}
}
</script>

<style lang='less' scoped>
.wrap{
	.head {
		color: #F4F4F4;
		background-color: #3D3D3D;
		height: 100%;
		.login {
			font-size: 0.4rem;
			height: 1rem;
			img {
				width: 70%;
				height: 70%;
			}
		}
		.top {
			height: 1rem;
			.left{
				padding-left: 0.3rem;
			}
			.name{
				font-size: 0.18rem;
				padding-left: 1.2rem;
				position: absolute;
			}
		}
		.middle {
			height: 0.6rem;
			font-size: 0.14rem;
			text-align: center;
			.line {
				border-right: 1px solid #ccc;
				width: 100%;
			}
			.line:last-child {
				border: none;
			}
		}
		.nologinhit {
			padding-top: 0.1rem;
		}
	}
}
</style>
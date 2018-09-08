<template>	
	<section :class="{wrap:true,night:$store.state.user.isNight}">
		<div class="toolBar df-sa">
			<div v-for='(item,index) in user.barList' v-show='getShow(index)' @click='routerPath(index)'>
				<mu-icon :value='item.icon' size='24' :color='item.color'></mu-icon>
				<div>{{item.title}}</div>
			</div>
		</div>
		<div class="bottom">
			<div class="lineH"></div>
			<toolBar  v-show='!$store.state.user.isLogin' @click.native="$router.push('/unfinished')">
				<span slot='left'>我的关注</span>
				<div slot='right'>
					<mu-icon value=':icon-forword'></mu-icon>
				</div>
			</toolBar>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left'>消息通知</span>
				<div slot='right'>
					<mu-icon value=':icon-forword'></mu-icon>
				</div>
			</toolBar>
			<div class="lineH"></div>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left'>我的钱包</span>
				<div slot='right'>
					<span>借钱最高可借20万</span>
				<mu-icon value=':icon-forword'></mu-icon>
				</div>
			</toolBar>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left'>京东特供</span>
				<div slot='right'>
					<span>新人领188元红包</span>
				<mu-icon value=':icon-forword'></mu-icon>
				</div>
			</toolBar>
			<div class="lineH"></div>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left'>用户反馈</span>
				<div slot='right'>
				<mu-icon value=':icon-forword'></mu-icon>
				</div>
			</toolBar>
			<toolBar @click.native="$router.push('/system')">
				<span slot='left'>系统设置</span>
				<div slot='right'>
					<mu-icon value=':icon-forword'></mu-icon>
				</div>
			</toolBar>
			<div class="lineH"></div>
		</div>
	</section>
</template>

<script>

import toolBar from '@/components/ToolBar/index'
import {mapGetters} from 'vuex'

export default{
	components:{
		toolBar
	},
	computed:{
		...mapGetters(['user'])
	},
	methods:{
		routerPath(index){
			if(this.user.barList[index].title=='夜间'){
				this.$store.state.user.isNight=true;
			}
			else if(this.user.barList[index].title=='白天'){
				this.$store.state.user.isNight=false;
			}else{
				this.$router.push('/unfinished');
			}
		},
		getShow(index){
			if(this.user.barList[index].title=='夜间'&this.$store.state.user.isNight){
				return false;
			}
			else if(this.user.barList[index].title=='白天'&!this.$store.state.user.isNight){
				return false;
			}
			else{
				return true;
			}
		}
	}
}
</script>

<style lang='less' scoped>
.wrap{
	.toolBar{
		font-size: 0.13rem;
		height: 0.6rem;
	}
	.bottom {
		[name='forword'] {
			font-size: 0.14rem;
		}
		.lineH {
			height: 0.05rem;
			background-color: #f7f3f3;
		}
	}

}
.night {
	background-color: black !important;
	color: white;
}

</style>
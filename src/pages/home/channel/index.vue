<template>
	<section class="channelWrap">
		<mu-button icon @click="$emit('closeChannel')">
			<mu-icon value=':icon-close'></mu-icon>
		</mu-button>
		<div class="df-sb bar">
			<div>
				<span class="title">我的频道</span>
				<span class="hit">点击进入频道</span>	
			</div>
			<div class="edit" @click="edit">{{btnText}}</div>
		</div>
		<div class="tabs">
			<div v-for="(tab,index) in myTabList" :class="{tabChannel:true,selectItemBefore:tabIndex>index,selectItem:tabIndex===index}" :key="index" 
				@click="tabSelect(tab.id)">
				<span>{{tab.name}}</span>
				<mu-icon value=":icon-close" class="closeIcon" v-show='isEdit' size="14" @click="myTabList.splice(index,1)"></mu-icon>
			</div>
		</div>
		<div class="bar">
			<span class="title">频道推荐</span>
			<span class="hit">点击添加频道</span>
		</div>
		<div class="df-sb tabs">
			<div v-for="(tab,id) in adviceTabList" :key="id" class='tabChannel' @click='myTabList.push(tab)'>
				{{'+'+tab.name}}
			</div>
		</div>
	</section>
</template>

<script>
import {mapGetters} from 'vuex'
import {Local} from '@/../static/utils/storage'

export default {
	data(){
		return {
			isEdit:false,
			btnText:'编辑',
			adviceTabList:Local.get('home_adviceTabList')
		}
	},
	props:(['tabIndex']),
	computed:{
		...mapGetters(['myTabList'])
	},
	methods:{
		edit(){
			if(!this.isEdit){
				this.btnText='完成';
				this.isEdit=true;
			}else{
				this.btnText='编辑';
				this.isEdit=false;
			}
		},
		tabSelect(index){
			this.$store.state.home.selectTabIndex=index;
			this.$store.state.home.tabSlide=true;
			this.$emit('closeChannel')
			this.$router.push('/home');
		}
	},
	mounted(){
		this.$store.dispatch('home/getAdviceTab');
	}
}
</script>

<style lang='less' scoped>
.channelWrap {
	.bar {
		padding: 0 0.15rem;
		.title {
			font-size: 18px;
		}
		.hit {
			font-size: 12px;
		}
	}
	.tabChannel {
		width: calc((100% - 0.4rem)/4);
		background-color: #F4F5F7;
		text-align: center;
		height: 0.4rem;
		line-height: 0.4rem;
		margin: 0.05rem 0.05rem;
		font-size: 15px;
		color: black;
		position: relative;
		.closeIcon {
			position: absolute;
			right: 0;
			top: -0.15rem;
		}
	}
	.tabs {
		display: flex;
		flex-wrap: wrap;
		padding: 0.1rem 0.1rem;
	}
	.edit {
		width: 60px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		border: 1px solid #de0a23;
		color: #de0a23;
		border-radius: 20px;
	}
	.selectItemBefore {
		color: #b5b1b1;
	}
	.selectItem {
		color: red;
	}
}
</style>
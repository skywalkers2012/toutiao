<template>
	<article class="resultWrap">
		<mu-tabs :value.sync="$store.state.home.selectTabIndex" @change='tabChange' indicator-color='white' ref="tabList" class="tabList-wrap">
			<mu-tab v-for='tab in myTabList' :key='tab.id' :ref="`tabItem${tab.id}`">{{tab.name}}</mu-tab>
		</mu-tabs>
		<div class='tabAll df-c' @click='showChannel=true'>
			<mu-icon value=":icon-menu" size='24'></mu-icon>
		</div>
		<div v-loading="loading" data-mu-loading-size="20" class='loadingCss' v-show='!loadResult'>
		</div>
		<div v-for='tab in myTabList' v-if='tab.id===$store.state.home.selectTabIndex' :key='tab.name' class="tabContainer" v-show='loadResult' :ref="`newsTab${tab.id}`">	
			<mu-load-more  :loading="loadMore" @load="loadMoreData" @refresh="refreshData" :refreshing="refreshing" loading-text="正在推荐新内容">	
				<div v-if='showUpdateNum' class="df-c updateHit">今日头条推荐引擎有{{lastReadNewNum}}条更新</div>
				<div v-for='(item,index) in itemList' :key='item.id'>
					<div v-if='index>0&&index===lastReadNewNum' @click='refreshData' class="df-c readReadBar">
						<span>刚才看到这里 点击刷新</span>			
						<mu-icon value=":icon-fresh"></mu-icon>
					</div>
					<NewsInfo :data='item' class='newsTitle' @click.native="$router.push({name:'NewsDetail',params:{newsId:item.id,title:item.title}})"></NewsInfo>
				</div>			
			</mu-load-more>
		</div>
		<transition enter-active-class='animated slideInUp' leave-active-class='animated slideOutDown'>
			<channel v-show='showChannel' class='channelForm' @closeChannel='showChannel=false' :tabIndex="$store.state.home.selectTabIndex"></channel>
		</transition>
	</article>
</template>

<script>

import {mapGetters} from 'vuex'
import channel from './channel/index'

export default {
	components:{
		channel
	},
	data(){
		return {
			loading:false,
			loadResult:false,
			loadMore:false,
			refreshing:false,
			showChannel:false,
			lastReadNewNum:0,
			showUpdateNum:false,
			watchDataChange:false
		}
	},
	computed:{
		itemList(){
			return this.$store.state.home.homeResult;
		},
		selectChange(){
			return this.$store.state.home.selectTabIndex;
		},
		refresh(){
			return this.$store.state.home.refresh;
		},
		...mapGetters(['myTabList'])
	},
	watch:{
		itemList(newData,oldData){
			if(!this.watchDataChange) return;
			this.lastReadNewNum=newData.length-oldData.length;
			if(this.lastReadNewNum>0){
				this.showUpdateNum=true;
				setTimeout(()=>{
					this.showUpdateNum=false;
					this.watchDataChange=false;
				},800)
			}
		},
		refresh(newData,oldData){
			if(newData){
				this.loadData(this.$store.state.home.selectTabIndex);
				this.$store.state.home.refresh=false;
			}
		},
		selectChange(){
			if(this.$store.state.home.tabSlide){
				var domItem=this.$refs["tabItem"+this.$store.state.home.selectTabIndex][0].$el;
				var domBar=this.$refs.tabList.$el;
				var itemLeft=domItem.offsetLeft;
				var itemBarWidth=domBar.clientWidth;
				if(itemLeft>itemBarWidth){
					domBar.scrollLeft=(itemLeft-itemBarWidth)+domItem.clientWidth;
				}else{
					domBar.scrollLeft=0;
				}
				this.$store.state.home.tabSlide=false;
			}
		}
	},
	methods:{
		tabChange(){
			this.watchDataChange=false;
			this.loadData(this.$store.state.home.selectTabIndex);
		},
		loadData(typeId){
			this.loading=true;
			this.loadResult=false;
			this.$store.state.user.refreshSearcHit=true;
			this.$store.dispatch('home/getNews',{typeId:typeId});
			setTimeout(() => {
				this.loading=false;
				this.loadResult=true;
			}, 500)
		},
		loadMoreData(){
			this.loadMore = true;
			setTimeout(() => {
				this.loadMore = false;
				this.$store.dispatch('home/loadMore',{typeId:this.$store.state.home.selectTabIndex});
			}, 1000)
		},
		refreshData(){
			this.refreshing = true;
			this.watchDataChange=true;
			this.$refs['newsTab'+this.$store.state.home.selectTabIndex][0].scrollTop=0;
			setTimeout(() => {
				this.refreshing = false;
				this.$store.dispatch('home/refreshData',{typeId:this.$store.state.home.selectTabIndex});
			}, 1000)
		}
	},
	mounted(){
		this.loadData(this.$store.state.home.selectTabIndex);
	}
}
</script>

<style lang='less' scoped>
.resultWrap{
	.newsTitle{
		padding: 0.1rem 0.1rem;
		border-bottom: 1px solid rgba(221, 221, 221, 0.6);
	}
	.tabContainer{
		height: calc(100% - 0.4rem);
		overflow-y: auto;
	}
	.tabContainer::-webkit-scrollbar {
		display: none;
	}
	.tabAll {
		position: fixed;
		right: 0;
		top: 0.55rem;
		z-index: 100;
		background-color: white;
		width: 50px;
		height: 30px;
		box-shadow: -5px 0 5px #e1dcdc;
	}
	.tabList-wrap {
		width: calc(100% - 50px);
	}
}
.loadingCss{
	height: 20px;
	position: relative;
}

.channelForm {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 200;
	background-color: #FAFAFA;
}
.readReadBar {
	height: 30px;
	background-color: #D9EBF8;	
}
.updateHit {
	height: 30px;
	background-color: #D9EBF8;
	color: #322abf;
}

</style>
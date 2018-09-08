<template>
	<article class="xiguavideo-Wrap" ref="all">
		<mu-tabs :value.sync="selectItem" @change='tabChange' indicator-color='white'>
			<mu-tab v-for='tab in videoTabList' :key='tab.id'>{{tab.name}}</mu-tab>
		</mu-tabs>
		<div v-loading="loading" data-mu-loading-size="20" class='loadingCss' v-show='!loadResult'>
		</div>
		<div v-for='tab in videoTabList' v-if='tab.id===selectItem' :key='tab.name' class="tabContainer" v-show='loadResult' :ref="`newsTab${tab.id}`" @scroll="handleScroll">		
			<mu-load-more  :loading="loadMore" @load="loadMoreData" @refresh="refreshData" :refreshing="refreshing" loading-text="正在推荐新内容">
				<div v-if='showUpdateNum' class="df-c updateHit">今日头条推荐引擎有{{lastReadNewNum}}条更新</div>
				<div v-for='(item,index) in itemList' :key='item.id'>
					<transition  mode="out-in" enter-active-class='animated slideInUp' leave-active-class='animated slideOutDown'>
						<videoItem :videoData="item" class='videoItem' :ref="item.id"></videoItem>
					</transition>
				</div>		
			</mu-load-more>
		</div>
	</article>
</template>

<script>

import {mapGetters} from 'vuex'
import videoItem from './videoNews/index'

export default {
	components:{
		videoItem
	},
	data(){
		return {
			selectItem:this.$store.state.video.selectTabIndex,
			loading:false,
			loadResult:false,
			loadMore:false,
			refreshing:false,
			lastReadNewNum:0,
			showUpdateNum:false,
			watchDataChange:false,
		}
	},
	computed:{
		itemList(){
			return this.$store.state.video.videoResult;
		},
		refresh(){
			return this.$store.state.video.refresh;
		},
		...mapGetters(['videoTabList'])
	},
	beforeRouteLeave(to, from, next) {
		this.$refs.all.style='z-index:-1';
		next();
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
					this.handleScroll();
				},800)
			}
		},
		refresh(newData,oldData){
			if(newData){
				this.loadData(this.$store.state.video.selectTabIndex);
				this.$store.state.video.refresh=false;
			}
		},
	},
	methods:{
		tabChange(){
			this.watchDataChange=false;
			this.$store.state.video.selectTabIndex=this.selectItem;
			this.loadData(this.selectItem);
		},
		loadData(typeId){
			this.loading=true;
			this.loadResult=false;
			this.$store.state.user.refreshSearcHit=true;
			this.$store.dispatch('video/getVideos',{typeId:typeId});
			setTimeout(() => {
				this.loading=false;
				this.loadResult=true;
			}, 500)
		},
		loadMoreData(){
			this.loadMore = true;
			setTimeout(() => {
				this.loadMore = false;
				this.$store.dispatch('video/loadMore',{typeId:this.selectItem});
			}, 1000)
		},
		refreshData(){
			this.refreshing = true;
			this.watchDataChange=true;
			this.$refs['newsTab'+this.selectItem][0].scrollTop=0;
			setTimeout(() => {
				this.refreshing = false;
				this.$store.dispatch('video/refreshData',{typeId:this.selectItem});
			}, 1000)
		},
		handleScroll(){
			for(var i=0;i<this.itemList.length;i++){
				var  dom =this.$refs[this.itemList[i].id][0];
				if(this.$refs['newsTab'+this.selectItem][0]){
					if((this.$refs['newsTab'+this.selectItem][0].scrollTop-dom.$el.offsetTop)>261||(dom.$el.offsetTop-this.$refs['newsTab'+this.selectItem][0].scrollTop)
						>this.$refs['newsTab'+this.selectItem][0].clientHeight){
						dom.$data.pause=true;
				}
			}
		}
	}
},
mounted(){
	this.loadData(this.selectItem);
}
}
</script>

<style lang='less' scoped>

.xiguavideo-Wrap{
	.tabContainer{
		height: calc(100% - 0.4rem);
		overflow-y: auto;
	}
	.tabContainer::-webkit-scrollbar {
		display: none;
	}
	.videoItem {
		border-bottom: 1px solid rgba(221, 221, 221, 0.6);
	}
}
.loadingCss{
	height: 20px;
	position: relative;
}

.updateHit {
	height: 30px;
	background-color: #D9EBF8;
	color: #322abf;
}

</style>
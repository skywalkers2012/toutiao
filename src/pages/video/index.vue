<template>
	<article class="xiguavideo-Wrap" v-show="showAll">
		<mu-tabs :value.sync="selectItem" @change='tabChange' indicator-color='white'>
			<mu-tab v-for='tab in videoTabList' :key='tab.id'>{{tab.name}}</mu-tab>
		</mu-tabs>
		<div v-loading="loading" data-mu-loading-size="20" class='loadingCss' v-show='!loadResult'>
		</div>
		<div v-for='tab in videoTabList' v-if='tab.id===selectItem' :key='tab.name' class="tabContainer" v-show='loadResult' :ref="`newsTab${tab.id}`" @scroll="handleScroll">		
			<mu-load-more  :loading="loadMore" @load="loadMoreData" @refresh="refreshData" :refreshing="refreshing" loading-text="正在推荐新内容">
				<div v-if='showUpdateNum' class="df-c updateHit">今日头条推荐引擎有{{lastReadNewNum}}条更新</div>
				<div v-for='(item,index) in itemList' :key='item.id'>
					<videoItem  :videoData="item" class='videoItem' :ref="item.id"></videoItem>
				</div>		
			</mu-load-more>
		</div>
		<bottomSheet></bottomSheet>
	</article>
</template>

<script>

import {mapGetters} from 'vuex'
import videoItem from '@/components/news/videoNews/index'
import bottomSheet from '@/components/bottomSheet/index.vue'

export default {
	components:{
		videoItem,
		bottomSheet
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
			showAll:true
		}
	},
	computed:{
		itemList(){
			return this.$store.state.video.videoResult;
		},
		...mapGetters(['videoTabList'])
	},
	beforeRouteLeave(to, from, next) {
		this.showAll=false;
		setTimeout(function(){
			next();
		}, 100)
	},
	watch:{
		itemList : function(newData,oldData){
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
		}
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
				if((this.$refs['newsTab'+this.selectItem][0].scrollTop-dom.$el.offsetTop)>261||(dom.$el.offsetTop-this.$refs['newsTab'+this.selectItem][0].scrollTop)
					>this.$refs['newsTab'+this.selectItem][0].clientHeight){
					dom.$data.pause=true;
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
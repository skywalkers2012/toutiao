<template>
	<article class="minVideo-wrap" >
		<section class='header-wrap df-sb'>
			<div class="left df-sa">
				<div v-for="bar in barList" @click="selectItem=bar.id" :key="bar.id" :class="{tabActive:selectItem===bar.id}">{{bar.name}}</div>
			</div>
			<div class="right df-sa">
				<mu-icon value=":icon-shipin" size="26"></mu-icon>
				<span>发布</span>
			</div>
		</section>
			<div class="itemContent" v-if="selectItem===bar.id" v-for="bar in barList" :key="bar.id" v-show="showAll">
				<mu-load-more :loading="loadMore" @load="loadMoreData" @refresh="refreshData" :refreshing="refreshing" loading-text="推荐中" :loaded-all="false">
					<div v-if='refreshing' class="df-c updateHit">推荐中</div>
					<div class="tabItem">
						<minVideo v-for='(item,index) in itemList' :key='item.id' :videoData="item" class='videoItem' :ref="item.id" @delVideo='itemList.splice(index,1)'></minVideo>
					</div>
				</mu-load-more>
			</div>
		<footerBar></footerBar>
	</article>
</template>

<script>
import footerBar from '@/pages/layout/footerBar'
import minVideo from '@/components/video/index'

export default{
	components:{
		footerBar,
		minVideo
	},
	data(){
		return {
			barList:[{id:0,name:"关注"},{id:1,name:"推荐"},{id:2,name:"附近"},{id:3,name:"活动"}],
			height:0,
			width:0,
			video:[],
			selectItem:this.$store.state.minVideo.selectTabIndex,
			loading:false,
			loadResult:false,
			loadMore:false,
			refreshing:false,
			showAll:true
		}
	},
	computed:{
		itemList(){
			return this.$store.state.video.videoResult;
		}
	},
	beforeRouteLeave(to, from, next) {
		this.showAll=false;
		setTimeout(function(){
			next();
		}, 100)
	},
	mounted(){
		this.loadData(this.selectItem);
	},
	methods:{
		loadData(typeId){
			this.loading=true;
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
			setTimeout(() => {
				this.refreshing = false;
				this.$store.dispatch('video/refreshData',{typeId:this.selectItem});
			}, 1000)
		},
	}
}
</script>

<style lang='less' scoped>
.minVideo-wrap {
	.header-wrap {
		height: 0.5rem;
		position: relative;
		.left{
			position: absolute;
			left: 0.1rem;
			font-size: 18px;
			div {
				padding-right: 0.2rem;
			}
		}
		.right {
			position: absolute;
			right: 0.1rem;
			font-size: 16px;
			span {
				padding-left: 0.05rem;
			}
		}
	}
	.itemContent {
		height: calc(100% - 1rem);
		overflow: auto;
		.tabItem {
			display: flex;
			flex-wrap: wrap;
			.videoItem {
				width: 50%;
			}
		}	
	}
	.itemContent::-webkit-scrollBar {
		display: none;
	}
}
.tabActive {
	color: red;
}
.updateHit {
	height: 30px;
	background-color: #D9EBF8;
	color: #322abf;
}
</style>
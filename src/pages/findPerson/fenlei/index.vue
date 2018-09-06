<template>
	<article class="fenglei-wrap">
		<headerBar title="分类查找">
			<div slot="right" class="right">
				<mu-icon value=":icon-search" size="30"></mu-icon>
			</div>
		</headerBar>
		<div class="content-wrap">
			<div class="left-wrap">
				<div :class="{typeItem:true,'typeItem-active':$store.state.findPerson.selectType===type.id}" v-for="type in typeList" @click="clickItem(type)">{{type.name}}</div>
			</div>
			<div class="right-wrap" >
				<div v-if="type.id===$store.state.findPerson.selectType"  v-for="type in typeList">
					<mu-tabs :value.sync="$store.state.findPerson.selectTabId">
						<mu-tab v-for="tabItem in type.children" :key='tabItem.tabId' :value="tabItem.tabId">{{tabItem.name}}</mu-tab>
					</mu-tabs>
					<div v-if="tab.tabId === $store.state.findPerson.selectTabId" v-for="tab in type.children" class="item-wrap">
						<mu-load-more  :loading="loadMore" @load="loadMoreData" loading-text="正在加载">
							<personBar v-for="person in personDataList" :personData="person" :key="person.id"></personBar>	
						</mu-load-more>	
					</div>
				</div>
				<div v-if="$store.state.findPerson.selectType===0" class="tuijian-wrap">
					<mu-load-more  :loading="loadMore" @load="loadMoreData" loading-text="正在加载">
						<personBar v-for="person in personDataList" :personData="person" :key="person.id"></personBar>
					</mu-load-more>
				</div>
			</div>		
		</div>
	</article>
</template>

<script>
import headerBar from '@/components/HeaderBar/index'
import personBar from '@/components/personBar/index'
import {Local} from '@/../static/utils/storage'

export default {
	data(){
		return {
			loadMore:false
		}
	},
	components:{
		headerBar,
		personBar
	},
	computed:{
		typeList(){
			return this.$store.state.findPerson.typeList;
		},
		personDataList(){
			var needData=[];
			this.$store.state.findPerson.personBarInfo.forEach(item=>{
				if(item.firstTypeId===this.$store.state.findPerson.selectType&&item.secondTypeId===this.$store.state.findPerson.selectTabId){
					needData.push(item);
				}
			})
			if(needData.length<5){
				this.loadMoreData();
			}
			return needData;
		}
	},
	methods:{
		clickItem(type){
			this.$store.state.findPerson.selectType=type.id;
			if(type.children){
				this.$store.state.findPerson.selectTabId=type.children[0].tabId;
			}else{
				this.$store.state.findPerson.selectTabId=0;
			}
		},
		loadMoreData(){
			this.loadMore = true;
			setTimeout(() => {
				this.loadMore = false;
				this.getData();
			}, 1000)
		},
		getData(){
			this.$store.dispatch('findPerson/getPersonBarInfo',{firstTypeId:this.$store.state.findPerson.selectType,secondTypeId:this.$store.state.findPerson.selectTabId});
		}
	}
}
</script>

<style lang='less' scoped>
.fenglei-wrap {
	.right{
		position: absolute;
		right: 0.1rem;
		top: 50%;
		transform: translateY(-50%);
	}
	.content-wrap {
		display: flex;
		height: calc(100% - 0.5rem);

		.left-wrap{
			width: 0.7rem;
			height: 100%;
			overflow-y: scroll;
			.typeItem {
				height: 0.6rem;
				line-height: 0.7rem;
				text-align: center;
				font-size: 14px;
				border-right: 1px solid #edecec;
			}
			.typeItem-active {
				font-size: 18px;
				color: red;
			}
		}
		.left-wrap::-webkit-scrollbar {
			display: none;
		}
		.right-wrap {
			width: calc(100% - 0.7rem);	
			height: 100%;
			.item-wrap {
				position: absolute;
				height: calc(100% - 1rem);
				width: calc(100% - 0.7rem);
				overflow-y: auto;
			}
			.item-wrap::-webkit-scrollbar {
				display: none;
			}
			.tuijian-wrap {
				overflow-y: auto;
				height: 100%;
				overflow-y: auto;
			}
			.tuijian-wrap::-webkit-scrollbar {
				display: none;
			}
		}


	}
}
</style>
<template>
	<div class="find-wrap">
		<div class="headSearch-wrap">
			<div class="header-left">
				<input type="text" placeholder="搜索用户名" class='search'>
				<mu-icon class='searchIcon' value=":icon-search"></mu-icon>
			</div>
			<div class="header-right">
				<mu-icon value=":icon-phoneBook" color="black" size='24' ></mu-icon>
				<span>通讯录</span>
			</div>
		</div>
		<div class="body-wrap">
			<div class="fenleiSearch-wrap">
				<titleBar title="分类查找" @clickMore="goFenlei(0,0)"></titleBar>
				<div class="typeList">
					<div class="type" v-for="type in adviceSearchTypeList" @click="goFenlei(type.firstTypeId,type.secondTypeId)" :key="type.id">
						{{type.name}}
					</div>
				</div>
			</div>
			<div class="personBarContent">		
				<div v-for="bar in adviceTypeList" :key="bar.id">
					<div class="lineH"></div>
					<personGroupBar class="findContent-wrap" :groupInfo="bar" :personDataList="getPersonData(bar.id)"></personGroupBar>	
				</div>
				<div class="guessLike">
					<titleBar title="猜你喜欢" @clickMore="goFenlei(0,0)"></titleBar>
					<mu-load-more  :loading="loadMore" @load="loadMoreData" loading-text="正在加载">
						<personBar v-for="person in guessLikeData" :key="person.id" :personData="person"></personBar>
					</mu-load-more>
				</div>	
			</div>
		</div>
		<footerBar></footerBar>
	</div>
</template>

<script>
import personGroupBar from '@/components/personGroupBar/index'
import personBar from '@/components/personBar/index'
import footerBar from '@/pages/layout/footerBar'
import {Local} from '@/../static/utils/storage'
import titleBar from '@/components/titleBar/index'

export default{
	data(){
		return {
			loadMore:false
		}
	},
	components:{
		footerBar,
		personGroupBar,
		titleBar,
		personBar
	},
	computed:{
		adviceTypeList(){
			if(Local.get('findPerson_typeList')){
				this.$store.state.findPerson.typeList=Local.get('findPerson_typeList');
			}
			return this.$store.state.findPerson.typeList.slice(0, 5);
		},
		personBarInfo(){
			if(Local.get('findPerson_personBarInfo')){
				this.$store.state.findPerson.personBarInfo=Local.get('findPerson_personBarInfo');
			}
			return this.$store.state.findPerson.personBarInfo;
		},
		adviceSearchTypeList(){
			var needType=[];
			this.$store.state.findPerson.typeList.slice(1, 20).forEach(item=>{
				item.children.forEach(child=>{
					if(child.name.length===4){
						var need={firstTypeId:item.id,secondTypeId:child.tabId,name:child.name};
						needType.push(need)
					}
				})
			})					
			return needType.slice(0,6);
		},
		guessLikeData(){
			var passData=[];
			this.$store.state.findPerson.personBarInfo.forEach(item=>{
				if(item.firstTypeId===0)
				{
					passData.push(item);
				}
			})
			return passData;
		}
	},
	methods:{
		getPersonData(firstTypeId){
			var passData=[];
			this.personBarInfo.forEach(item=>{
				if(item.firstTypeId===firstTypeId)
				{
					passData.push(item);
				}
			})
			return passData;
		},
		goFenlei(firstTypeId,secondTypeId){
			this.$store.state.findPerson.selectType=firstTypeId;
			this.$store.state.findPerson.selectTabId=secondTypeId;
			this.$router.push('/fenlei');
		},
		loadMoreData(){
			this.loadMore = true;
			setTimeout(() => {
				this.loadMore = false;
				this.$store.dispatch('findPerson/getPersonBarInfo',{firstTypeId:0,secondTypeId:0});
			}, 1000)
		}
	},
	beforeCreate(){
		if(!Local.get('findPerson_typeList')){
			this.$store.dispatch('findPerson/getTypeList').then(res=>{
				res.slice(0, 5).forEach(item=>{
					var secondTypeId=0;
					if(item.children){
						item.children.forEach(child=>{
							secondTypeId=child.tabId;
							this.$store.dispatch('findPerson/getPersonBarInfo',{firstTypeId:item.id,secondTypeId:secondTypeId});
						})	
					}else{
						this.$store.dispatch('findPerson/getPersonBarInfo',{firstTypeId:0,secondTypeId:0});
					}
				})
			});
		}
	}
}
</script>

<style lang='less' scoped>
.find-wrap {
	.headSearch-wrap {
		position: relative;
		top: 0;
		left: 0;
		height: 0.5rem;
		.header-left {
			.search {
				width: calc(100% - 0.75rem);
				height: 0.3rem;
				border: none;
				outline: none;
				border-radius: 0.04rem;
				text-indent: 0.3rem;
				position: absolute;
				top: 0.1rem;
				left: 0.16rem;
				background-color: #F4F5F7;
			}
			.searchIcon {
				position: absolute;
				left: 0.2rem;
				top: 0.14rem;
				font-size: 0.22rem;	
			}
		}
		.header-right{
			position: absolute;
			right: 0.08rem;
			bottom: 0.03rem;
			padding-top: 0.01rem;
			font-size: 0.11rem;
			text-align: center;
			width: 0.5rem;
			> span {
				display: block;
				font-size: 10px;
			} 
		}
	}
	.body-wrap::-webkit-scrollBar {
		display: none;
	}
	.body-wrap{
		height: calc(100% - 1rem);
		overflow-y: auto;
		.fenleiSearch-wrap {
			.bar {
				height: 0.3rem;
				.title {
					font-size: 20px;
					padding-left: 0.15rem;
				}
				.more {
					padding-right: 0.15rem;
				}
			}
			.typeList {
				display: flex;
				flex-wrap: wrap;
				.type {
					width: 33.333333%;
					flex-wrap: nowrap;
					color: #505050;
					font-size: 16px;
					line-height: 30px;
					height: 30px;
					text-align: center;
				}
			}
		}
		.personBarContent {
			.lineH {
				width: 100%;
				height: 0.1rem;
				background-color: #F4F5F7;
			}
		}
	}
}
</style>
<template>
	<div class="resultWrap">
		<mu-tabs :value.sync="selectItem" @change='tabChange'>
			<mu-tab v-for='tab in tabList' :key='tab.id'>{{tab.name}}</mu-tab>
		</mu-tabs>
		<div v-loading="loading" data-mu-loading-size="20" class='loadingCss' v-show='!loadResult'>
		</div>
		<div v-for='tab in tabList' v-if='tab.id===selectItem' :key='tab.name' class="resultContainer" v-show='loadResult' >
			<mu-load-more  :loading="loadMore" @load="loadMoreData" @refresh="refreshData" :refreshing="refreshing">
				<newsTitle :data='item' v-for='item in itemList' :key='item.id' class='newsTitle'></newsTitle>
			</mu-load-more>
		</div>

	</div>
</template>

<script>

import {mapGetters} from 'vuex'
import newsTitle from '@/components/news/newsTitle/index'

export default {
	components:{
		newsTitle
	},
	data(){
		return {
			selectItem:0,
			loading:false,
			loadResult:false,
			loadMore:false,
			refreshing:false
		}
	},
	computed:{
		itemList(){
			return this.$store.state.search.searchResult;
		},
		...mapGetters(['tabList','keyword'])
	},
	methods:{
		tabChange(){
			this.loadData(this.selectItem);
		},
		loadData(typeId){
			this.loading=true;
			this.loadResult=false;
			this.$store.dispatch('search/search',{keyword:this.keyword,typeId:typeId});
			setTimeout(() => {
				this.loading=false;
				this.loadResult=true;
			}, 500)
		},
		loadMoreData(){
			this.loadMore = true;
			setTimeout(() => {
				this.loadMore = false;
				this.$store.dispatch('search/loadMore',{keyword:this.keyword,typeId:this.selectItem});
			}, 500)
		},
		refreshData(){
			this.refreshing = true;
			setTimeout(() => {
				this.refreshing = false;
				this.$store.dispatch('search/refreshData',{keyword:this.keyword,typeId:this.selectItem});
			}, 500)
		}
	},
	mounted(){
		this.loadData(0);
	}
}
</script>

<style lang='less' scoped>
.resultWrap{
	.newsTitle{
		padding: 0.1rem 0.1rem;
		border-bottom: 1px solid rgba(221, 221, 221, 0.6);
	}
	.resultContainer{
		height: 100%;
		overflow-y: auto;
	}
	.loadingCss{
		height: 20px;
		position: relative;
	}
}



</style>
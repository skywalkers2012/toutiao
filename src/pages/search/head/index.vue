<template>
	<div class="headWrap">
		<div class="searchWrap df-sa" ref='head'>
			<mu-icon value=':icon-back' class='icon-back' size="24" @click='back'></mu-icon>	
			<mu-icon value=':icon-search' class='icon-search' ></mu-icon>
			<input type="text" placeholder="搜你想搜的" ref='search' @keyup='searchHit'  @keydown.enter.stop='search(keyword)' v-model='keyword'>
			<span class='searchText' @click.stop='search(keyword)'>搜索</span>	
			<mu-icon value=':icon-close' class='icon-close' @click="close" v-show='keyword.length>0' size="15"></mu-icon>
		</div>
		<div class="hit li-overflow" v-show='showHit'>
			<div v-for='(item,index) in searchHitList' class='hitRow df-fs' @click.stop='search(item)'>
				<mu-icon value=':icon-search' class='icon-search'></mu-icon>
				<span class='hitText' >{{item}}</span>
			</div>
		</div>
	</div>

</template>

<script>

import {mapGetters}from 'vuex'
import types from '@/store/types'

export default {
	data(){
		return {
			showHit:false,
			keyword:''
		}
	},
	computed:{
		...mapGetters(['searchHitList']),
		keywordtext(){
			return this.$store.state.search.keyword;
		}
	},
	watch:{
		keywordtext(newVal){
			this.keyword=newVal;
		}
	},
	methods:{
		back(){
			this.goBack(this.$router);
			this.$store.state.search.searchNow=false;
			this.$store.state.search.keyword='';
		},
		searchHit(e){
			if(e.keyCode==32||e.keyCode==13){
				return;
			}
			if(!this.showHit){
				this.showHit=true;
			}
			if(this.keyword.length>0){
				this.$store.dispatch('search/searchHit',{keyword:this.keyword,typeId:0});
			}	
		},
		close(){
			this.keyword='';
			this.showHit=false;
			this.$store.state.search.searchNow=false;
		},
		search(val){
			this.keyword=val;
			this.showHit=false;
			this.$store.dispatch('search/search',{keyword:val});
		}
	},
	mounted(){
		this.$refs.search.focus();
	}
}

</script>

<style lang='less' scoped>
.headWrap{
	.searchWrap {
		position: absolute;
		top: 0;
		left: 0;
		height: 0.5rem;
		width: 100%;
		background: #D33D3E;
		.icon-back{
			position: absolute;
			left: 0.1rem;
			color: white;
		}
		> input {
			border: none;
			border-radius: 4px;
			line-height: 0.36rem;
			width: calc(100% - 1rem);
			position: absolute;
			left: 0.4rem;
			text-indent: 0.2rem;
			font-size: 0.15rem;
		}
		.icon-search{
			position: absolute;
			left: 0.4rem;
		}
		.searchText {
			font-size: 0.16rem;
			width: 0.4rem;
			position: absolute;
			right: 0.1rem;
			color: white;
			text-align: center;
		}
		.icon-close{
			position: absolute;
			left: calc(100% - 0.8rem);
			font-size: 0.1rem;
		}
	}
	.hit{
		z-index: 300;
		position: absolute;
		top: 0.5rem;
		width: 100%;
		background: white;
		height: calc(100% - 1rem);
		.hitRow {
			width: 100%;
			height: 0.4rem;
			line-height: 0.4rem;
			border: 1px solid #f8f4f4;
			span {
				font-size: 0.16rem;
				position: absolute;
				left: 0.4rem;
			}
		}
		.icon-search{
			font-size: 0.2rem;
			position: absolute;
			left: 0.1rem;
		}
	}
}
</style>
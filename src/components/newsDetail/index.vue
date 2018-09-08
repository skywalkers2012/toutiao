<template>
	<section class="newsContent-wrap">
		<HeaderBar>
			<div slot="right">
				<mu-icon value=':icon-search' size='24' v-show='!changeHeader'></mu-icon>
				<mu-icon value=':icon-more' size='24'></mu-icon>
			</div>
			<div v-show='changeHeader' slot='center'>
				<PersonBar :personData="bindData" position='head'></PersonBar>
			</div>
		</HeaderBar>
		<div class="body-wrap" @scroll="handleScroll" ref="bodyWrap">
			<div class="title">{{$route.params.title}}</div>
			<PersonBar :personData="bindData" class="personBar" position='news'  ref='person'></PersonBar>
			<div class="content">
				<div class="paragraph" v-for='(item,index) in bindData.newsContent'>{{item}}</div>
			</div>
		</div>
		<WriteComment class="bottom-wrap"></WriteComment>
	</section>
</template>

<script>
export default {
	data(){
		return {
			bindData:{},
			changeHeader:false
		}
	},
	methods:{
		handleScroll(){
			if(this.$refs.bodyWrap.scrollTop>this.$refs.person.$el.offsetTop){
				this.changeHeader=true;
			}else{
				this.changeHeader=false;
			}

		}
	},
	mounted(){
		this.$store.dispatch('home/getNewsContent',this.$route.params.newsId).then(res=>{
			this.bindData=res;
		})
	}
}
</script>

<style lang='less' scoped>
.newsContent-wrap{
	position: relative;
	.personBar{
		height: 0.5rem;
	}
	.body-wrap{
		height: calc(100% - 1rem);
		overflow: auto;
		.title {
			font-size: 24px;
			line-height: 30px;
			padding: 0.1rem;
		}
		.content {
			font-size: 18px;
			.paragraph{
				text-indent: 0.2rem;
				padding: 0.1rem 0;
			}
		}
	}
	.bottom-wrap {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.body-wrap::-webkit-scrollbar {
		display: none;
	}
}
</style>
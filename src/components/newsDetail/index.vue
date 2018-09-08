<template>
	<section class="newsContent-wrap">
		<HeaderBar>
			<div slot="right">
				<mu-icon value=':icon-search' size='24'></mu-icon>
				<mu-icon value=':icon-more' size='24'></mu-icon>
			</div>
		</HeaderBar>
		<div class="body-wrap">
			<div class="title">{{$route.params.title}}</div>
			<PersonBar :personData="bindData" class="personBar"></PersonBar>
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
			bindData:{}
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
	.body-wrap{
		height: calc(100% - 1rem);
		overflow: auto;
		.personBar{
			height: 0.6rem;
		}
		.title {
			font-size: 20px;
			line-height: 30px;
			padding: 0.1rem;
		}
		.content {
			padding: 0.1rem;
			font-size: 16px;
			.paragraph{
				text-indent: 0.2rem;
				padding: 0.05rem 0;
			}
		}
	}
	.bottom-wrap {
		position: absolute;
		bottom: 0;
		left: 0;
	}
}
</style>
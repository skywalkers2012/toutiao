<template>
	<mu-bottom-sheet :open.sync="$store.state.video.showZhuanfa" class="bottomSheet-wrap">
		<div class="icons df-sa">
			<div class="contentWrap df-c" v-for="item in items" @click="zhuanfa(item.id)">
				<div class="tb-c">
					<mu-avatar color="white" size="70">
						<img :src="item.img">
					</mu-avatar>
					<div class="name">{{item.name}}</div>
				</div>
			</div>		
		</div>
		<div class="close df-c" @click="$store.state.video.showZhuanfa=false">
			取消
		</div>
	</mu-bottom-sheet>
</template>

<script>
export default {
	data(){
		return {
			items:[
			{id:0,img:"~@/../static/img/toutiao.png",name:"转发"},
			{id:1,img:"~@/../static/img/pengyouquan.png",name:"朋友圈"},
			{id:2,img:"~@/../static/img/weixinhaoyou.png",name:"微信好友"},
			{id:3,img:"~@/../static/img/qqkongjian.png",name:"qq空间"},
			{id:4,img:"~@/../static/img/jiarushoucang.png",name:"加入收藏"},
			{id:5,img:"~@/../static/img/buganxingqu.png",name:"不感兴趣"},
			{id:6,img:"~@/../static/img/ding.png",name:"顶"},
			{id:7,img:"~@/../static/img/cai.png",name:"踩"}
			]
		}
	},
	methods:{
		zhuanfa(id){
			console.log(id);
		}
	},
	mounted(){

	}
}
</script>

<style lang='less' scoped>
.bottomSheet-wrap{
	height:3.5rem;
	background-color: #F4F4F4;
	.icons {
		flex-wrap: wrap;
		height: 3rem;
		.contentWrap {
			width:25%;
		}
		.name {
			font-size: 12px;
			padding-top: 10px;
		}
		img {
			width: 60%;
			height: 60%;
		}
	}

	.close{
		height: 0.5rem;
		color: balck;
		border-top: 1px solid #ccc;
		font-size: 18px;
		color: #261616;
		background-color: white;
	}
}

</style>
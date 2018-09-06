<template>
	<div class="newsTitle">
		<div :class='{oneImg:data.imgList.length===1}'>
			<h3>{{data.title}}</h3>
			<ul class='listImg' v-if='data.imgList.length!=1'>
				<li class='list_class_holder df-sa' v-for='(imgItem,index) in data.imgList' >
					<img :src="imgItem" >
				</li>
			</ul>	
			<img :src="data.imgList[0]" v-if='data.imgList.length===1' >
		</div>
		<div class="item_info">
			<mu-icon value=':icon-hot' v-show='data.ishot' size='15' color='red'></mu-icon>
			<span class='src'>{{data.src}}</span>
			<span class='cms'>评论:{{data.cmt}}</span>
			<span class='time'>{{data.time}}</span>
		</div>
	</div>
</template>

<script>
export default {
	props:['data']
}
</script>

<style lang='less' scoped>
.newsTitle{
	h3 {
		color: #222;
		font-size: 17px;
		line-height: 21px;
		font-weight: normal;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.listImg{
		display: flex;
		flex-direction: row-reverse;
	}
	.list_class_holder{
		width: 33.33333%;
	}
	.item_info{
		display: flex;
		justify-content: flex-start;
		font-size: 0.1rem;
		color: #999;
		span {
			padding: 0 0.05rem;
		}
	}
	.oneImg{
		display: flex;
		padding-right: 0.05rem;
		h3 {
			width: 70%;
			padding-right: 0.05rem;
		}
		img {
			height: 30%;
			width: 30%;
		}
	}
	img {
		height: 100%;
		width: 100%;
	}
}
</style>
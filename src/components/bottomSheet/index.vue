<template>
	<mu-bottom-sheet :open.sync="isShow" class="bottomSheet-wrap">
		<div class="icons df-sa">
			<div class="contentWrap df-c" v-for="item in bindData" @click="$emit('clickItem',item)">
				<div class="tb-c">
					<mu-avatar color="white" size="60">
						<img :src="item.img">
					</mu-avatar>
					<div class="name">{{item.name}}</div>
				</div>
			</div>		
		</div>
		<div class="close df-c" @click="isShow=false">
			取消
		</div>
	</mu-bottom-sheet>
</template>

<script>
export default {
	data(){
		return {
			isShow:this.open
		}
	},
	watch:{
		open(old,val){
			this.isShow=true;
		}
	},
	props:{
		open:{
			type:Boolean,
			default:false
		},
		bindData:{
			type:Array
		}
	}
}
</script>

<style lang='less' scoped>
.bottomSheet-wrap{
	height:2.5rem;
	background-color: #F4F4F4;
	.icons {
		flex-wrap: wrap;
		height: 2.1rem;
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
		height: 0.4rem;
		color: balck;
		border-top: 1px solid #ccc;
		font-size: 18px;
		color: #261616;
		background-color: white;
	}
}

</style>
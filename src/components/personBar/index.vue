<template>
	<section class="personBar-wrap">
		<div class="left-wrap">
			<mu-avatar size="54">
				<img :src="personData.avatar">
			</mu-avatar>
			<div class="info">
				<div class="name">{{personData.name}}</div>
				<div class="intro">{{personData.intro}}</div>
				<div class="fengsi">{{personData.fengsi}}万粉丝</div>
			</div>
		</div>
		<div class="right-wrap" @click="guanzhu">
			<div :class="{'button-wrap':true,'df-c':true,yiguanzhu:isGuanzhu}">{{btnText}}
				<mu-circular-progress class="demo-circular-progress" :size="22" :stroke-width="2" v-show="showCircular" color="white"></mu-circular-progress>
			</div>		
		</div>
	</section>	
</template>

<script>
export default {
	data(){
		return {
			btnText:"关注",
			showCircular:false,
			isGuanzhu:false
		}
	},
	props:{
		personData:{
			type:Object
		}
	},
	methods:{
		guanzhu(){
			if(this.isGuanzhu){
				this.isGuanzhu=false;
				this.showCircular=false;
				this.btnText="关注";
			}else{
				this.showCircular=true;	
				this.btnText="";
				setTimeout(()=>{
					this.showCircular=false;
					this.isGuanzhu=true;
					this.btnText="已关注";
					this.$emit("guanzhu");
				}, 500);
			}
		}
	}
}
</script>

<style lang='less' scoped>
.personBar-wrap {
	position: relative;
	height: .8rem;
	.left-wrap {
		position: absolute;
		left: .15rem;
		top: .1rem;
		width: 2.8rem;
		.info {
			display: inline-block;
			padding-left: .1rem;
			.name {
				font-size: 18px;
			}
			.intro {
				font-size: 16px;
				color: #C0C0C0;
				white-space: nowrap;
				width: 2rem;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.fengsi {
				font-size: 12px;
				color: #C0C0C0;
			}
		}
	}
	.right-wrap{
		position: absolute;
		right: .15rem;
		top: .25rem;
		.button-wrap{
			background-color: red;
			border-radius: 5px;
			height: .3rem;
			line-height: .3rem;
			width: .6rem;
			text-align: center;
			color: white;
			font-size: 14px;
		}
	}
}
.yiguanzhu {
	background-color: white!important;
	color: black!important;
	border: 1px solid #ccc;
}
</style>
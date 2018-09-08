<template>
	<section class="personBar-wrap df-sa">
		<div class="left-wrap df-sa" ref='left'>
			<mu-avatar :size="avatarSize">
				<img :src="personData.avatar">
			</mu-avatar>
			<div class="info">
				<div class="name" ref="name">{{personData.name}}</div>
				<div class="intro" v-show="showIntro" ref="intro">{{personData.intro}}</div>
				<div class="fengsi" v-show="showFengsi" ref="fengsi">{{personData.fengsi}}万粉丝</div>
			</div>
		</div>
		<div class="right-wrap" @click="guanzhu" ref="right">
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
			isGuanzhu:false,
			avatarSize:50,
			showFengsi:true,
			showIntro:true
		}
	},
	props:{
		personData:{
			type:Object
		},
		position:{
			type:String,
			default:'findPerson'
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
	},
	mounted(){
		if(this.position==='news'){
			this.avatarSize=32;
			this.$refs.name.style="font-size:14px";
			this.$refs.intro.style="font-size:12px";
			this.showFengsi=false;
		}
		if(this.position==='head'){
			this.avatarSize=30;
			this.$refs.name.style="font-size:14px";
			this.$refs.fengsi.style="font-size:10px";
			this.$refs.right.style="right:0";
			this.showIntro=false;
		}
	}
}
</script>

<style lang='less' scoped>
.personBar-wrap {
	position: relative;
	height: 0.8rem;
	.left-wrap {
		position: absolute;
		left: 15px;
		.info {
			display: inline-block;
			padding-left: 0.1rem;
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
		right: 15px;
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
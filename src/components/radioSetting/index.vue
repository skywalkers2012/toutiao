<template>
	<div class="radioSettingWrap">
		<div class="radioSettingWrap-box" v-show="show">
			<div class="title">{{title}}</div>
			<div class="radioList ">
				<div v-for='option in options' class="df-sa">
					<mu-radio v-model="selectValue" :value="option.value" :label="option.label"  @change="$emit('selectChange',$event)" label-left style='width:85%'></mu-radio>
				</div>
			</div>
			<div class="footerWrap" @click="$emit('close')">
				{{cancleName}}
			</div>
		</div>
	</div>
</template>

<style lang='less' scoped>

.radioSettingWrap {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;top: 0;
	z-index: 1000;
	background-color: rgba(0, 0, 0, .3);
	.radioSettingWrap-box {
		position: absolute;
		width: 85%;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fafafc;
		border-radius: 3px;
		overflow: hidden;
		.title {
			padding: 0.16rem 0 0.1rem 0;
			line-height: 0.18rem;
			color: #333;
			font-size: 0.16rem;
			padding-left: 0.2rem;
		}
		.footerWrap {
			position: relative;
			line-height: 0.42rem;
			margin-top: 0.2rem;
			font-size: 0.17rem;
			color: #0bb20c;
			cursor: pointer;
			text-align: right;
			padding-right: 0.2rem;
		}
	}
}
</style>

<script>

export default {
	props:{
		title:{
			default:'skywalker',
			type:String
		},
		cancleName:{
			default:'取消',
			type:String
		},
		options:{

		},
		value:{

		}
	},
	data(){
		return {
			show:true,
			selectValue:this.value
		}
	}
}
</script>
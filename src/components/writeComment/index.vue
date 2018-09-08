<template>
	<div class="comment-wrap df-sa" ref='comment' v-click-outside="blur">
		<div class="left df-sa" v-show="!publish">
			<input type="text" placeholder="写评论..." @click="write">
			<mu-icon value=':icon-write' class='write' size='18'></mu-icon>
			<mu-icon value=':icon-Smile' class='smile' size='18'></mu-icon>
		</div>
		<div class="right df-sa" v-show="!publish">
			<mu-icon value=':icon-pinglun' size='24'></mu-icon>
			<mu-icon value=':icon-shoucang' size='24'></mu-icon>
			<mu-icon value=':icon-zhuanfa' size='24'></mu-icon>
		</div>
		<div class="publish" v-show="publish" >
			<div class='df-sb top'>
				<input type="text" placeholder="优质评论将会被优先展示" ref="inputComment" v-focus='publish'>
				<span>发布</span>
			</div>
			<div class="df-sb bottom">
				<div class="bottom-left">
					<mu-checkbox label="同时转发" v-model="zhuanfa"></mu-checkbox>
				</div>
				<div class="bottom-right df-sa">
					<mu-icon value=':icon-xiangce' size='24'></mu-icon>
					<mu-icon value=':icon-at' size='24'></mu-icon>
					<mu-icon value=':icon-huati' size='24'></mu-icon>
					<mu-icon value=':icon-Smile' size='24'></mu-icon>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			publish:false,
			zhuanfa:false
		}
	},
	methods:{
		write(){
			this.publish=true;
			this.$refs.comment.style="height:0.8rem";
		},
		blur(){
			this.publish=false;
			this.$refs.comment.style="height:0.5rem";
		}
	},
	directives: {
		focus(el) {
			el.focus();
		}
	}
}
</script>

<style lang='less' scoped>
.comment-wrap{
	width: 100%;
	z-index: 66;
	height: 0.5rem;
	background-color: white;
	.left{
		width: 50%;
		input {
			margin-left: 0.2rem;
			border-radius: 20px;
			height: 0.35rem;
			line-height: 0.35rem;
			background-color: #F4F5F7;
			border: none;
			text-indent: 0.4rem;
			outline: none;
			width: 100%;
		}
		.write {
			position: absolute;
			left: 0.3rem;
		}
		.smile {
			position: absolute;
			left: calc(50% - 0.3rem);
		}
	}
	.right {
		width: 50%;
	}
	.publish {
		width: 100%;
		.top{
			height: 0.4rem;
			input {
				margin-left: 0.1rem;
				border-radius: 20px;
				height: 0.3rem;
				line-height: 0.3rem;
				background-color: #F4F5F7;
				border: none;
				text-indent: 0.15rem;
				outline: none;
				width: 80%;
			}
			span {
				font-size: 15px;
				padding-right: 0.1rem;
				color: #b9b5b5;
				font-weight: bold;
			}
		}
		.bottom {
			height: 0.4rem;
			padding-left: 0.1rem;
			.bottom-left {
				width: 40%;
			}
			.bottom-right {
				width: 60%;
			}
		}

	}
}
</style>
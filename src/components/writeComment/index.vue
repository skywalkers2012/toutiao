<template>
	<div class="comment-wrap df-sa">
		<div class="left df-sa">
			<input type="text" placeholder="写评论...">
			<mu-icon value=':icon-write' class='write' size='20'></mu-icon>
			<mu-icon value=':icon-Smile' class='smile' size='20'></mu-icon>
		</div>
		<div class="right df-sa">
			<mu-icon value=':icon-pinglun' size='26'></mu-icon>
			<mu-icon value=':icon-shoucang' size='26'></mu-icon>
			<mu-icon value=':icon-zhuanfa' size='26'></mu-icon>
		</div>
	</div>
</template>

<style lang='less' scoped>
.comment-wrap{
	height: 0.5rem;
	width: 100%;
	.left{
		input {
			margin-left: 0.2rem;
			border-radius: 20px;
			height: 0.3rem;
			line-height: 0.3rem;
			background-color: #F4F5F7;
			border: none;
			text-indent: 0.3rem;
			outline: none;
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
		width: 40%;
	}
}
</style>
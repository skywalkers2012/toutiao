<template>
	<section class="titleBar-wrap df-sb">
		<div class="title">{{title}}</div>
		<div class="more" @click="$emit('clickMore')">
			<span>更多</span>
			<mu-icon value=":icon-forword" class="back"  size="14"></mu-icon>
		</div>
	</section>
</template>

<script>

export default {
	props:(['title'])
}
</script>

<style lang='less' scoped>

.titleBar-wrap {
	height: 0.5rem;
	line-height: 0.5rem;
	.title {
		padding-left: 0.15rem;
		font-size: 18px;
		font-weight: bold;
	}
	.more {
		padding-right: 0.15rem;
		font-size: 16px;
	}
}

</style>
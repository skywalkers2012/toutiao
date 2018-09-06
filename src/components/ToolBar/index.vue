<template>
	<div class="toolBarWrap df-sb">
		<div class='left df-sb'>
			<slot name='left' >

			</slot>
		</div>
		<div class="right df-sb">
			<slot name='right' >

			</slot>
		</div>

	</div>
</template>

<<style lang='less' scoped>
.toolBarWrap{
	height: 0.5rem;
	font-size: 0.16rem;

	.left {
		padding-left: 0.2rem;
	}
	.right {
		padding-right: 0.2rem;
	}
}
</style>

<script>
export default {

}
</script>
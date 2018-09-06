<template>
	<div class="searchWrap">
		<searchHearder class='searchHeader'></searchHearder>
		<searchBody class='searchBody'></searchBody>
	</div>
</template>

<script>

import searchHearder from './head/index'
import searchBody from './body/index'

export default {
	components:{
		searchHearder,
		searchBody
	}
}
</script>

<style lang='less' scoped>

.searchWrap {
	background-color: white;
	.searchHeader{
		height: 0.5rem;
	}
	.searchBody{
		height: calc(100% - 0.5rem);
	}
}
</style>
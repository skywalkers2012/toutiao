<template>
	<div class="bodyWrap">
		<searchAdvice v-if='!$store.state.search.searchNow' class='searchAdvice-wrap'></searchAdvice>
		<searchResult v-if='$store.state.search.searchNow' class='searchResult-wrap'></searchResult>
	</div>
</template>

<script>
import searchAdvice from '../advice/index'
import searchResult from '../result/index'
import {mapGetters} from 'vuex'

export default {
	components:{
		searchAdvice,
		searchResult
	}
}
</script>

<style lang='less' scoped>
.bodyWrap{
	.searchAdvice-wrap {
		position: absolute;
		top: 0.5rem;
		left: 0;
		font-size: 0.16rem;
		overflow: hidden;
		height: calc(100% - 0.5rem);
	}
	.searchResult-wrap {
		height: calc(100% - 0.5rem);
	}
}

</style>
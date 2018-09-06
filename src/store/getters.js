const getters = {

	/*user*/
	footerBarList: state => state.user.footerBarList,
	user:state=>state.user.user,

	/*search*/
	adviceList:state=>state.search.adviceList,
	historyList:state=>state.search.historyList,
	guessCustomerLike:state=>state.search.guessCustomerLike,
	searchHitList:state=>state.search.searchHitList,
	searchResult:state=>state.search.searchResult,
	keyword:state=>state.search.keyword,
	tabList:state=>state.search.tabList,

	/*home*/
	homeResult:state=>state.home.homeResult,
	
	myTabList:state=>state.home.myTabList,
	adviceTabList:state=>state.home.adviceTabList,

	/*video*/
	videoTabList:state=>state.video.tabList
}

export default getters;
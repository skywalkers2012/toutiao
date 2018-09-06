import axios from '@/../static/utils/fetch'
import types from '../types'
import {Local} from '@/../static/utils/storage'


const search ={
// 
state:{
	adviceList:[],
	historyList:[],
	guessCustomerLike:[],
	searchHitList:[],
	keyword:'',
	searchResult:[],
	searchNow:false,
	tabList:[{id:0,name:"综合"},{id:1,name:"视频"}, {id:2,name:"咨询"}, {id:3, name:"小视频"}, {id:4, name:"图片"}, {id:5, name:"用户"}, {id:6, name:"问答"}],
	adviceSearchInterval:10000
},
actions:{
	search({commit},params){
		return new Promise((resolve,reject)=>{
			if(Local.get('search-keyword')===params.keyword){
				var result=Local.get('search_result');
				if(result){
					var needResult=[];
					result.map(item=>{
						if(item.typeId===params.typeId){
							needResult.push(item);
						}
					})
					if(needResult.length>0){
						commit(types.SEARCH_GETSEARCHSTORAGE,needResult);
						resolve(needResult);
						return;
					}
				}
			}
			axios.get('getSearchResult',params).then(res=>{
				commit(types.SEARCH_SEARCH,{"result":res.data.list,params});
				resolve(res.data.list);
			}).catch(err=>{
				reject(err);
			})
		})
	},
	loadMore({commit},params){
		return new Promise((resolve,reject)=>{
			axios.get('getSearchResult',params).then(res=>{
				commit(types.SEARCH_LOADMORE,{"result":res.data.list,params});
				resolve(res.data.list);
			}).catch(err=>{
				reject(err);
			})
		})
	},
	refreshData({commit},params){
		return new Promise((resolve,reject)=>{
			axios.get('getSearchResult',params).then(res=>{
				commit(types.SEARCH_REFRESHDATA,{"result":res.data.list,params});
				resolve(res.data.list);
			}).catch(err=>{
				reject(err);
			})
		})
	},
	searchHit({commit},params){
		return new Promise((resolve,reject)=>{
			axios.get('searchHit',params).then(res=>{
				commit(types.SEARCH_HIT,res.data.list);
				resolve(res.data.list);
			}).catch(err=>{
				console.log(err);
				reject(err);
			})
		}
		)
	},
	guessCustomerLike({commit},params){
		return new Promise((resolve,reject)=>{
			axios.get('guessCustomerLike').then(res=>{
				commit(types.SEARCH_GUESSCUSTOMERLIKE,res.data.list);
				resolve(res.data.list);
			}).catch(err=>{
				reject(err);
			})
		})
	},
	adviceSearch({commit},params){
		return new Promise((resolve,reject)=>{
			axios.get('adviceSearch').then(res=>{
				commit(types.SEARCH_ADVICESEARCH,res.data.list);
				resolve(res.data.list);
			}).catch(err=>{
				reject(err);
			})
		})
	}
},
mutations:{
	[types.SEARCH_SEARCH] (state,data){
		state.searchResult=data.result;
		state.keyword=data.params.keyword;	
		state.searchNow=true;
		if(Local.get('search_keyword')===data.params.keyword){
			var result=Local.get('search_result');
			result=data.result.concat(result);
			Local.set('search_result',result);
		}else{
			Local.set('search_keyword',data.params.keyword);
			Local.set('search_result',data.result);
			state.historyList.unshift(data.params.keyword);
		}
	},
	[types.SEARCH_HIT](state,data){
		state.searchHitList=data;
	},
	[types.SEARCH_GUESSCUSTOMERLIKE](state,data){
		state.guessCustomerLike=data;
	},
	[types.SEARCH_ADVICESEARCH](state,data){
		state.adviceList=data;
	},
	[types.SEARCH_GETSEARCHSTORAGE](state,data){
		state.searchResult=data;
	},
	[types.SEARCH_LOADMORE](state,data){
		var result=Local.get('search_result');
		result=result.concat(data.result);
		Local.set('search_result',result);
		var showResult=[];
		result.map(item=>{
			if(item.typeId===data.params.typeId){
				showResult.push(item);
			}
		})
		if(showResult.length>0){
			state.searchResult=showResult;
		}	
	},
	[types.SEARCH_REFRESHDATA](state,data){
		var result=Local.get('search_result');
		result=data.result.concat(result);
		Local.set('search_result',result);
		var showResult=[];
		result.map(item=>{
			if(item.typeId===data.params.typeId){
				showResult.push(item);
			}
		})
		if(showResult.length>0){
			state.searchResult=showResult;
		}	
	}
},
namespaced: true
}

export default search
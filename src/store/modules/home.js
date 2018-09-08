import axios from '@/../static/utils/fetch'
import types from '../types'
import {Local} from '@/../static/utils/storage'

const home={
	state:{
		myTabList:[
		{id:0,name:'关注'},{id:1,name:'推荐'},{id:2,name:'成都'},{id:3,name:'热点'},{id:4,name:'亚运会'},{id:5,name:'娱乐'},{id:6,name:'科技'},{id:7,name:'懂车帝'},
		{id:8,name:'体育'},{id:9,name:'财经'},{id:10,name:'军事'},{id:11,name:'国际'},{id:12,name:'健康'},{id:13,name:'问答'},{id:14,name:'新时代'}],
		adviceTabList:[],
		homeResult:[],
		selectTabIndex:1,
		tabSlide:false,
		refresh:false,
	},
	actions:{
		getNews({commit},params){
			return new Promise((resolve,reject)=>{
				var result=Local.get('home_result');
				if(result){
					var needResult=[];
					var data=result.map(item=>{
						if(item.typeId===params.typeId){
							needResult.push(item);
						}
					})
					if(needResult.length>0){
						commit(types.HOME_GETSEARCHSTORAGE,needResult);
						resolve(needResult);
						return;
					}
				}
				axios.get('getNews',params).then(res=>{
					commit(types.HOME_GETNEWS,{"result":res.data.list,params});
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		},
		loadMore({commit},params){
			return new Promise((resolve,reject)=>{
				axios.get('getNews',params).then(res=>{
					commit(types.HOME_LOADMORE,{"result":res.data.list,params});
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		},
		getNewsContent({commit},params){
			return new Promise((resolve,reject)=>{
				axios.get('getNewsContent',params).then(res=>{
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		},
		refreshData({commit},params){
			return new Promise((resolve,reject)=>{
				axios.get('getNews',params).then(res=>{
					commit(types.HOME_REFRESHDATA,{"result":res.data.list,params});
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		},
		getAdviceTab({commit},params){
			if(Local.get('home_adviceTabList')) return;
			return new Promise((resolve,reject)=>{
				axios.get('adviceTabList').then(res=>{
					commit(types.HOME_GETADVICETABLIST,res.data.list);
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		}
	},
	mutations:{
		[types.HOME_GETNEWS] (state,data){
			if(!data.result) return;
			state.homeResult=data.result;
			var result=Local.get('home_result');
			if(result){
				result=data.result.concat(result);
				Local.set('home_result',result);
			}else{
				Local.set('home_result',data.result);
			}		
		},
		[types.HOME_GETADVICETABLIST](state,data){
			state.adviceTabList=data;
			Local.set('home_adviceTabList',data);
		},
		[types.HOME_GETSEARCHSTORAGE](state,data){
			state.homeResult=data;
		},
		[types.HOME_LOADMORE](state,data){
			if(!data.result) return;
			var result=Local.get('home_result');
			if(result){
				result=result.concat(data.result);
				Local.set('home_result',result);
			}else{
				Local.set('home_result',data.result);
				result=data.result;
			}
			var showResult=[];
			result.map(item=>{
				if(item.typeId===data.params.typeId){
					showResult.push(item);
				}
			})
			if(showResult.length>0){
				state.homeResult=showResult;
			}	
		},
		[types.HOME_REFRESHDATA](state,data){
			if(!data.result) return;
			var result=Local.get('home_result');
			if(result){
				result=data.result.concat(result);
				Local.set('home_result',result);
			}else{
				Local.set('home_result',data.result);
				result=data.result;
			}
			var showResult=[];
			result.map(item=>{
				if(item.typeId===data.params.typeId){
					showResult.push(item);
				}
			})
			if(showResult.length>0){
				state.homeResult=showResult;
			}	
		}
	},
	namespaced: true
}

export default home
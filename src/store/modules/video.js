import axios from '@/../static/utils/fetch'
import types from '../types'
import {Local} from '@/../static/utils/storage'

const video = {
	state:{
		tabList:[{id:0,name:"关注"},{id:1,name:"推荐"}, {id:2,name:"直播"}, {id:3, name:"音乐"}, {id:4, name:"影视"}, {id:5, name:"综艺"}, {id:6, name:"社会"}],
		videoResult:[],
		selectTabIndex:1,
		playToken:"no token",
		showZhuanfa:false
	},
	actions:{
		getVideos({commit},params){
			return new Promise((resolve,reject)=>{
				var result=Local.get('video_result');
				if(result){
					var needResult=[];
					var data=result.map(item=>{
						if(item.typeId===params.typeId){
							needResult.push(item);
						}
					})
					if(needResult.length>0){
						commit(types.VIDEO_GETSEARCHSTORAGE,needResult);
						resolve(needResult);
						return;
					}
				}
				axios.get('getVideos',params).then(res=>{
					commit(types.VIDEO_GETVIDEOS,{"result":res.data.list,params});
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		},
		loadMore({commit},params){
			return new Promise((resolve,reject)=>{
				axios.get('getVideos',params).then(res=>{
					commit(types.VIDEO_LOADMORE,{"result":res.data.list,params});
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		},
		refreshData({commit},params){
			return new Promise((resolve,reject)=>{
				axios.get('getVideos',params).then(res=>{
					commit(types.VIDEO_REFRESHDATA,{"result":res.data.list,params});
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		}
	},
	mutations:{
		[types.VIDEO_GETVIDEOS] (state,data){
			if(!data.result) return;
			state.videoResult=data.result;
			var result=Local.get('video_result');
			if(result){
				result=data.result.concat(result);
				Local.set('video_result',result);
			}else{
				Local.set('video_result',data.result);
			}		
		},
		[types.VIDEO_GETSEARCHSTORAGE](state,data){
			state.videoResult=data;
		},
		[types.VIDEO_LOADMORE](state,data){
			if(!data.result) return;
			var result=Local.get('video_result');
			if(result){
				result=result.concat(data.result);
				Local.set('video_result',result);
			}else{
				Local.set('video_result',data.result);
				result=data.result;
			}
			var showResult=[];
			result.map(item=>{
				if(item.typeId===data.params.typeId){
					showResult.push(item);
				}
			})
			if(showResult.length>0){
				state.videoResult=showResult;
			}	
		},
		[types.VIDEO_REFRESHDATA](state,data){
			if(!data.result) return;
			var result=Local.get('video_result');
			if(result){
				result=data.result.concat(result);
				Local.set('video_result',result);
			}else{
				Local.set('video_result',data.result);
				result=data.result;
			}
			var showResult=[];
			result.map(item=>{
				if(item.typeId===data.params.typeId){
					showResult.push(item);
				}
			})
			if(showResult.length>0){
				state.videoResult=showResult;
			}	
		}
	},
	namespaced:true
}

export default video
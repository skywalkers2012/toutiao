import {Local} from '@/../static/utils/storage'
import axios from '@/../static/utils/fetch'
import types from '../types'

const findPerson = {
	state:{
		typeList:[],
		personBarInfo:[],
		selectType:0,
		selectTabId:0
	},
	actions:{
		getTypeList({commit},params){
			return new Promise((resolve,reject)=>{
				axios.get('getFenleiList').then(res=>{
					commit(types.FINDPERSON_GETFENLEILIST,res.data.list);
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		},
		getPersonBarInfo({commit},params){
			return new Promise((resolve,reject)=>{
				axios.get('getPersonBarInfo',params).then(res=>{
					commit(types.FINDPERSON_GETPERSONBARINFO,res.data.list);
					resolve(res.data.list);
				}).catch(err=>{
					reject(err);
				})
			})
		}
	},
	mutations:{
		[types.FINDPERSON_GETFENLEILIST](state,data){
			state.typeList=data;
			Local.set('findPerson_typeList',data);
		},
		[types.FINDPERSON_GETPERSONBARINFO](state,data){
			state.personBarInfo=state.personBarInfo.concat(data);
			Local.set('findPerson_personBarInfo',state.personBarInfo);
		}
	},
	namespaced:true
}

export default findPerson;
import {Cookie,Local} from '@/../static/utils/storage'
import axios from 'axios'
import types from '../types'

const user ={
	state:{
		footerBarList: [{
			title: '首页',
			icon: 'home',
			path: '/home'
		}, {
			title: '西瓜视频',
			icon: 'video',
			path: '/video'
		}, {
			title: '找人',
			icon: 'findPerson',
			path: '/findPerson'
		}, {
			title: '小视频',
			icon: 'minVideo',
			path: '/minVideo'
		}, {
			title: `${Cookie.get('user_userName')?'我的':'未登录'}`,
			icon: 'account',
			path: '/account'
		}],
		isLogin:Cookie.get('userName'),
		user:{
			userName:'',
			userInfo:[{title:'动态',num:20},{title:'关注',num:38},{title:'粉丝',num:89}],
			barList:[
			{icon:':icon-shoucang',title:'收藏',color:'#F0C592'},
			{icon:':icon-lishi',title:'历史',color:'#F398B5'},
			{icon:':icon-yejian',title:'夜间',color:'#8AA3F1'},
			{icon:':icon-rijian',title:'白天',color:'white'}
			],
			loginType:['shouji.png','weixin.png','qq.png','weibo.png'],
			showZhaiyao:false,
			showNotice:false,
			isClickGetNews:false
		},
		isNight:false,
		publishBar:[{title:'发图文',icon:':icon-tuwen'},{title:'拍小视频',icon:':icon-paishipin'},{title:'上传视频',icon:':icon-shipin'},{title:'提问',icon:':icon-tiwen'}],
		footBarSelectIndex:'/home',
		myGuanzhu:[],
		footBarLastClickIndex:'/home',
		refreshSearcHit:false
	},
	actions:{
		login({commit},params){
			return new Promise((resolve,reject)=>{
				if(params.userName=='12345678911'&params.pwd=='skywalker'){
					commit(types.ACCOUNT_LOGIN,params);
					resolve(true);
				}else{
					reject("用户名为12345678911 密码为skywalker");
				}
			})
		},
		loginOut({commit},params){
			commit(types.ACCOUNT_LOGINOUT);
		}
	},
	mutations:{
		[types.ACCOUNT_LOGIN](state,data){
			state.user.userName=data.userName;
			state.isLogin=true;
			Cookie.set({user_userName:data.userName});
		},
		[types.ACCOUNT_LOGINOUT](state,data){
			Cookie.remove(['user_userName']);
			state.isLogin=false;
		}
	},
	namespaced: true
}

export default user
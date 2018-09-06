import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout/index.vue'
import Home from '@/pages/home/index'
import Video from '@/pages/video/index'
import FindPerson from '@/pages/findPerson/index'
import FenLei from '@/pages/findPerson/fenlei/index'
import MinVideo from '@/pages/minVideo/index'
import Account from '@/pages/account/index'
import Search from '@/pages/search/index'
import System from '@/pages/system/index'
import Unfinished from '@/pages/unfinished/index'


Vue.use(Router)
Router.prototype.animate = 0

const routes = [
{	
	path: '/',
	name: '布局',
	component: Layout,
	redirect: '/home',
	meta:{
		keepAlive:false
	},
	children: [{
		path: 'home',
		name: '首页',
		component: Home
	}]
}
,{	
	path: '/video',
	component: Layout,
	redirect: '/',
	meta:{
		keepAlive:false
	},
	children: [{
		path: '/',
		name: '西瓜视频',
		component: Video
	}]
},
{	
	path: '/findPerson',
	component: FindPerson,
	name: '找人',
	meta:{
		keepAlive:false
	}
},
{	
	path: '/minVideo',
	component: MinVideo,
	meta:{
		keepAlive:false
	}
},
{	
	path: '/account',
	component: Account,
	meta:{
		keepAlive:false
	},
	name: '我的'
},
{	
	path: '/search',
	component: Search,
	meta:{
		keepAlive:false
	},
	name:'搜索'
},
{
	path:'/system',
	component:System,
	name:'系统设置',
	meta:{
		slide:1,
		keepAlive:false
	}
},
{
	path:'/unfinished',
	component:Unfinished,
	name:'未完成',
	meta:{
		slide:1,
		keepAlive:false
	}
},
{
	path:'/fenlei',
	component:FenLei,
	name:'分类查找',
	meta:{
		slide:1,
		keepAlive:false
	}
}
]

export default new Router({
	routes
})
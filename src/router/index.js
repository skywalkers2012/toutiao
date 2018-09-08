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
import NewsDetail from '@/pages/home/newsDetail/index'


Vue.use(Router)
Router.prototype.animate = 0

const routes = [
{	
	path: '/',
	component: Layout,
	redirect: '/home',
	meta:{
		keepAlive:true
	},
	children: [{
		path: 'home',
		name: 'Home',
		component: Home
	}]
}
,{	
	path: '/video',
	component: Layout,
	redirect: '/',
	meta:{
		keepAlive:true
	},
	children: [{
		path: '/',
		name: 'Video',
		component: Video
	}]
},
{	
	path: '/findPerson',
	component: FindPerson,
	name: 'FindPerson',
	meta:{
		keepAlive:true
	}
},
{	
	path: '/minVideo',
	component: MinVideo,
	name:'MinVideo',
	meta:{
		keepAlive:true
	}
},
{	
	path: '/account',
	component: Account,
	name:'Account',
	meta:{
		keepAlive:true
	},
	name: '我的'
},
{	
	path: '/search',
	component: Search,
	meta:{
		keepAlive:true
	},
	name:'Search'
},
{
	path:'/system',
	component:System,
	name:'System',
	meta:{
		slide:1,
		keepAlive:true
	}
},
{
	path:'/unfinished',
	component:Unfinished,
	name:'Unfinished',
	meta:{
		slide:1,
		keepAlive:true
	}
},
{
	path:'/fenlei',
	component:FenLei,
	name:'FenLei',
	meta:{
		slide:1,
		keepAlive:true
	}
},
{
	path:'/newsDetail',
	component:NewsDetail,
	name:'NewsDetail',
	meta:{
		slide:1,
		keepAlive:false
	}
}
]

export default new Router({
	routes
})
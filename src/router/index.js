import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Router.prototype.animate = 0

const routes = [
{	
	path: '/',
	redirect: '/home',
},
{	
	path: '/',
	component: resolve => require(['@/pages/layout/index.vue'], resolve),
	redirect: '/home',
	children: [{
		path: 'home',
		name: 'Home',
		component: resolve => require(['@/pages/home/index.vue'],resolve)
	}]
},
{	
	path: '/video',
	component: resolve => require(['@/pages/layout/index.vue'],resolve),
	redirect: '/',
	children: [{
		path: '/',
		name: 'Video',
		component: resolve => require(['@/pages/video/index.vue'],resolve)
	}]
},
{	
	path: '/findPerson',
	component: resolve => require(['@/pages/findPerson/index.vue'],resolve),
	name: 'FindPerson',
},
{	
	path: '/minVideo',
	component: resolve => require(['@/pages/minVideo/index.vue'], resolve),
	name:'MinVideo',
},
{	
	path: '/account',
	component: resolve => require(['@/pages/account/index.vue'], resolve),
	name:'Account'
},
{	
	path: '/search',
	component: resolve => require(['@/pages/search/index.vue'], resolve),
	name:'Search'
},
{
	path:'/system',
	component:resolve => require(['@/pages/system/index.vue'], resolve),
	name:'System',
	meta:{
		slide:1
	}
},
{
	path:'/unfinished',
	component:resolve => require(['@/pages/unfinished/index.vue'], resolve),
	name:'Unfinished',
	meta:{
		slide:1
	}
},
{
	path:'/fenlei',
	component:resolve => require(['@/pages/findPerson/fenlei/index.vue'], resolve),
	name:'FenLei',
	meta:{
		slide:1
	}
},
{
	path:'/newsDetail',
	component:resolve => require(['@/pages/home/newsDetail/index.vue'], resolve),
	name:'NewsDetail',
	meta:{
		slide:1
	}
}
]

export default new Router({
	routes
})
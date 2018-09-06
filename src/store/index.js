import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import search from './modules/search'
import home from './modules/home'
import video from './modules/video'
import findPerson from './modules/findPerson'
import minVideo from './modules/minVideo'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store(
{
	modules:{
		user,
		search,
		home,
		video,
		findPerson,
		minVideo
	},
	getters
}
)

export default store;

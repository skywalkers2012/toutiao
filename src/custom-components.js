import HeaderBar from './components/headerBar'
import PersonBar from './components/personBar'
import NewsDetail from './components/newsDetail'
import NewsInfo from './components/newsInfo'
import WriteComment from './components/writeComment'

const install = Vue => {
	Vue.component('HeaderBar', HeaderBar)
	Vue.component('PersonBar', PersonBar)
	Vue.component('NewsDetail', NewsDetail)
	Vue.component('NewsInfo', NewsInfo)
	Vue.component('WriteComment', WriteComment)
}

export default install

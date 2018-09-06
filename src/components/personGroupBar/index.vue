<template>
	<article class="personGroup-wrap">
		<titleBar :title="groupInfo.name" @clickMore="goFenlei(groupInfo)"></titleBar>
		<div class="itemList">
			<personBar v-for="(person,index) in personBarData" :key="person.id" :personData="person" @guanzhu="guanzhu(index,person)" :class="{animated:guanzhuIndex===index,bounceIn:guanzhuIndex===index}"></personBar>
		</div>
	</article>
</template>

<script>
import personBar from '@/components/personBar/index'
import titleBar from '@/components/titleBar/index'

export default {
	data(){
		return {
			personBarData:this.personDataList.slice(0,3),
			guanzhuIndex:-1,

		}
	},
	components:{
		personBar,
		titleBar,
	},
	props:['personDataList','groupInfo'],
	methods:{
		goFenlei(groupInfo){
			this.$store.state.findPerson.selectType=groupInfo.id;
			if(groupInfo.children){
				this.$store.state.findPerson.selectTabId=groupInfo.children[0].tabId;
			}	else{
				this.$store.state.findPerson.selectTabId=0;
			}
			this.$router.push('/fenlei');
		},
		guanzhu(index,person){
			this.personDataList.splice(index,1);		
			setTimeout(()=>{
				this.guanzhuIndex=index;
				this.$store.state.user.myGuanzhu.push(person);
				this.personBarData=this.personDataList.slice(0,3);
			}, 500);
		}
	}
}
</script>

<style lang='less' scoped>
.personGroup-wrap {
	.titleBar-wrap {
		height: 0.5rem;
		line-height: 0.5rem;
		.title {
			padding-left: 0.15rem;
			font-size: 18px;
			font-weight: bold;
		}
		.more {
			padding-right: 0.15rem;
			font-size: 16px;
		}
	}
}
</style>
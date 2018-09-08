<template>
	<article class="personGroup-wrap">
		<titleBar :title="groupInfo.name" @clickMore="goFenlei(groupInfo)"></titleBar>
		<div>
			<PersonBar v-for="(person,index) in personBarData" :key="person.id" :personData="person" @guanzhu="guanzhu(index,person)" :class="{animated:guanzhuIndex===index,bounceIn:guanzhuIndex===index}"></PersonBar>
		</div>
	</article>
</template>

<script>
import titleBar from '@/components/titleBar/index'

export default {
	data(){
		return {
			personBarData:this.personDataList.slice(0,3),
			guanzhuIndex:-1,
		}
	},
	components:{
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

</style>
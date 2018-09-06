<template>
	<div class="adviceWrap">
		<div class='advice'>	
			<ul class="df-sa">
				<li v-for= '(item,index) in adviceList' @click.stop='search(item)'>
					{{item}}
				</li>	
			</ul>
		</div>	
		<div class="line" v-show='this.historyList.length>0'></div>		
		<div class='history' v-show='this.historyList.length>0'>
			<div class='df-sa titleBar'>
				<span class='title'>历史记录</span>			
				<mu-icon value=':icon-down' class='iconstyle icon-updown' v-show='!showUp' @click='showUp=true'></mu-icon>				
				<mu-icon value=':icon-up' class='iconstyle icon-updown' @click='showUp=false' v-show='showUp'></mu-icon>
				<mu-icon value=':icon-trash' class='iconstyle icon-trash-p' @click='showDel=true' v-show='!showDel'></mu-icon>
				<span v-show='showDel' @click='showDel=false' class="icon-trash-p">完成</span>	
			</div>
			<div class="listContent">
				<div v-for='(item,index) in showAllHIstory' class='li-overflow content' @click.stop='handle(item,index)'>
					{{item}}
					<mu-icon  value=":icon-close" v-show='showDel' class='iconClose' ></mu-icon>
				</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="guess">
			<div v-show='!eyeClose'>
				<div class='df-sa titleBar'>
					<span class='title'>猜你想搜的</span>
					<mu-icon value=":icon-eye_close" class='iconstyle icon-eye eye-close' @click='eyeClose=true'></mu-icon>				
				</div>
				<div class='listContent'>
					<div v-for='(item,index) in guessCustomerLike' class='li-overflow content' @click.stop='search(item)'>
						{{item}}
					</div>
				</div>
			</div>
			<div class="df-c titleBar" v-show='eyeClose' @click='eyeClose=false'>
				<mu-icon value=":icon-eye" class='iconstyle'></mu-icon>
				<span>查看全部推荐词</span>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
	data(){
		return {
			showUp:false,
			showDel:false,
			eyeClose:false
		}
	},
	computed:{
		...mapGetters(
			['adviceList','historyList','guessCustomerLike']
			),
		showAllHIstory(){
			if(this.showUp){
				return this.historyList;
			}else{
				return this.historyList.slice(0, 4);
			}
		}
	},
	methods:{
		search(val){
			this.$store.dispatch('search/search',{keyword:val,typeId:0});
		},
		handle(val,index){
			if(this.showDel){
				this.historyList.splice(index, 1);
			}else{
				this.$store.dispatch('search/search',{keyword:val,typeId:0});
			}
		}
	},
	beforeCreate(){
		this.$store.dispatch('search/guessCustomerLike');
	}
}
</script>

<style lang='less' scoped>
.adviceWrap{
	.line{
		height: 0.1rem;
		background-color: #F4F5F6;
	}
	.iconstyle {
		color: #6c6a6a;
	}
	.advice {
		height: 0.4rem;
		font-size: 0.16rem;
		ul {
			li {
				height: 0.4rem;
				line-height: 0.4rem;
				border: 1px solid #efebeb;
				width: 33.33333%;
				text-align: center;
				list-style: none;
			}
		}

	}
	.titleBar{
		color: #6c6a6a;	
		font-size: 0.14rem;
		height: 0.5rem;
		.title{
			left: 0.2rem;
			position: absolute;
		}
	}
	.history{
		.titleBar{
			.icon-updown{
				position: absolute;
				left: 0.8rem;
			}
			.icon-trash-p{
				position: absolute;
				right: 0.2rem;
			}
		}
		.iconClose{
			position: absolute;
			right: 0;
			top: -0.15rem;
			font-size: 0.1rem;
			color: black;
		}
	}
	.guess{
		.eye-close{
			position: absolute;
			right: 0.2rem;
		}
		.icon-eye{
			font-size: 0.2rem;
		}
	}
	.listContent{
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		.content {
			width: 50%;
			height: 0.4rem;
			line-height: 0.4rem;
			padding-left: 0.2rem;
			padding-right: 0.2rem;
			border: 1px solid #efebeb;
			position: relative;
		}
	}
}

</style>
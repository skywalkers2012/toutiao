<template>
	<section class="header-wrap df-sb">
		<div class="header-left">
			<input type="text" class="search">
			<label class="hit">
				<div :class="{colHit:true,animated: animate,slideInUp:animate}" @click='searchClick'>
					<span>{{$store.state.search.adviceList|hit}}</span>
				</div>
			</label>
			<mu-icon class='searchIcon' value=":icon-search" size="18"></mu-icon>
		</div>
		<div class="header-right">
			<mu-icon value=":icon-camera" color="white" size='24' @click='open=!open'></mu-icon>
			<span>发布</span>
		</div>
		<mu-menu cover placement="bottom-end" :open.sync="open" class="menuHead">
			<ul slot="content" >
				<li class="lifunction" v-for="item in $store.state.user.publishBar" @click="publish">
					<mu-icon :value="item.icon" size='24'></mu-icon>
					<span>{{item.title}}</span>
				</li>
			</ul>
		</mu-menu>
	</section>
</template>

<script>

export default {
	data(){
		return {
			keyWord:'',
			open:false,
			animate:true
		}
	},
	computed:{
		hitRefresh(){
			return this.$store.state.user.refreshSearcHit;
		}
	},
	filters:{
		hit(item){
			var content='';
			for(var i=0;i<item.length;i++){
				if(i!=item.length-1){
					content+=item[i]+"|";
				}else{
					content+=item[i];
				}	
			}
			return content;
		}
	},
	watch:{
		hitRefresh(newData){
			if(newData){
				this.refreshHit();
				this.$store.state.user.refreshSearcHit=false;
			}
		}
	},
	methods:{
		searchClick(){
			this.$router.push('/search');
		},
		publish(){
			this.$router.push('/unfinished');
			this.open=false;
		},
		refreshHit(){
			this.animate=false;
			this.$store.dispatch('search/adviceSearch').then(res=>{		
				this.hit=this.$store.state.search.adviceList;
				this.animate=true;
			});
		}
	}
}

</script>

<style lang='less' scoped>

.header-wrap {
	height: 0.5rem;
	background: #D33D3E;
	position: relative;
	.header-left {
		position: relative;
		left: 0;
		width: calc(100% - 0.75rem);
		height: 0.38rem;
		line-height: 0.38rem;
		.search {
			width: 100%;
			border: none;
			outline: none;
			border-radius: 0.04rem;
			text-indent: 0.3rem;
			position: absolute;
			left: 0.16rem;
		}
		.hit {
			position: absolute;
			left: 0.4rem;
			height: 0.38rem;
			line-height: 0.38rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 0.15rem;
			width: calc(100% - 0.4rem);
			.colHit {
				display: inline-block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.searchIcon {
			position: absolute;
			left: 0.2rem;
		}
	}
	.header-right{
		position: absolute;
		right: 0.08rem;
		bottom: 0.03rem;
		padding-top: 0.01rem;
		font-size: 0.11rem;
		text-align: center;
		width: 0.5rem;
		> span {
			display: block;
			color: white;
		} 
	}
	.menuHead {
		position: fixed;
		right: 0;
		top: 60px;
	}
}

.lifunction {
	width: 160px;
	height: 45px;
	background-color: black;
	opacity: 0.9;
	color: white;
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #3c3737;
	> * {
		padding: 0 0.2rem;
	}
}

</style>
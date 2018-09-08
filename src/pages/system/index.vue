<template>
	<article class="systemWarp">
		<HeaderBar>设置</HeaderBar>
		<section class='toolList'>
			<div v-show="isLogin">
				<div class="line"></div>
				<toolBar @click.native="$router.push('/unfinished')">
					<span slot='left'>编辑资料</span>
					<mu-icon value=':icon-forword' slot='right'></mu-icon>
				</toolBar>
				<toolBar @click.native="$router.push('/unfinished')">
					<span slot='left'>账号和隐私设置</span>
					<mu-icon value=':icon-forword' slot='right'></mu-icon>
				</toolBar>
				<toolBar @click.native="$router.push('/unfinished')">
					<span slot='left'>黑名单</span>
					<mu-icon value=':icon-forword' slot='right'></mu-icon>
				</toolBar>
			</div>
			<div class="line"></div>
			<toolBar @click.native='clearStorage'>
				<span slot='left'>清楚缓存</span>
				<span slot='right'>{{setInfo.storage}}</span>
			</toolBar>
			<toolBar @click.native='fontSizeShow=true'>
				<span slot='left'>字体大小</span>
				<span slot='right'>{{setInfo.fontSize}}</span>
			</toolBar>
			<toolBar>
				<span slot='left'>列表显示摘要</span>
				<mu-switch slot='right' v-model="setInfo.showZhaiyao" @change='save' color='#4caf50'></mu-switch>
			</toolBar>
			<toolBar @click.native='picDownloadShow=true'>
				<span slot='left'>非WiFi网络流量</span>
				<span slot='right'>{{setInfo.picDownload}}</span>
			</toolBar>
			<toolBar @click.native='noticeShow=true'>
				<span slot='left'>非WiFi网络播放提醒</span>
				<span slot='right'>{{setInfo.notice}}</span>
			</toolBar>
			<toolBar>
				<span slot='left'>推送通知</span>
				<mu-switch slot='right' v-model="setInfo.showNotice" @change='save' color='#4caf50'></mu-switch>
			</toolBar>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left'>允许应用在后台运行</span>
				<mu-icon value=':icon-forword' slot='right'></mu-icon>
			</toolBar>
			<toolBar>
				<span slot='left'>点击返回键获取新资讯</span>
				<mu-switch slot='right' v-model="setInfo.isClickGetNews" @change='save' color='#4caf50'></mu-switch>
			</toolBar>
			<div class="line"></div>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left' >广告设置</span>
				<mu-icon value=':icon-forword' slot='right'></mu-icon>
			</toolBar>
			<div class="line"></div>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left'>头条封面</span>
				<mu-icon value=':icon-forword' slot='right'></mu-icon>
			</toolBar>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left'>检查版本</span>
				<span slot='right'>6.6.6</span>
			</toolBar>
			<toolBar @click.native="$router.push('/unfinished')">
				<span slot='left'>关于头条</span>
				<mu-icon value=':icon-forword' slot='right'></mu-icon>
			</toolBar>

			<div v-show='isLogin'>
				<div class="line"></div>
				<div class="line"></div>
				<div class="line"></div>
				<div class='df-c login' @click='loginOut' >
					<span>退出登录</span>
				</div>
			</div>

			<div class='copyright df-c'>
				<span>@skywalker</span>
			</div>
		</section>
		<div>
			<radioSetting v-show='fontSizeShow' :options='fontSizeOptions' title='修改字体大小' @selectChange='fontSizeSet' :value='setInfo.fontSize' @close='fontSizeShow=false'>			
			</radioSetting>
			<radioSetting v-show='picDownloadShow' :options='picDownloadOptions' title='非WIFI网络流量' @selectChange='picDownloadSet' :value='setInfo.picDownload' @close='picDownloadShow=false'>			
			</radioSetting>
			<radioSetting v-show='noticeShow' :options='noticeOptions' title='非WIFI网络播放提醒' @selectChange='noticeSet' :value='setInfo.notice' @close='noticeShow=false'>			
			</radioSetting>
		</div>
	</article>
</template>

<style lang='less' scoped>
.systemWarp{
	.toolList {
		background-color: #fff;
		color: black;
		overflow-y: scroll;
		height: calc(100% - 0.5rem);
		.line {
			height: 0.1rem;
			background-color: #f7f3f3;
		}
		.login{
			color:red;
			font-size:0.16rem;
			height:0.3rem;
		}
		.copyright {
			height: 0.6rem;
			font-size: 0.12rem;
			background-color: #f7f3f3
		}
	}
}

</style>

<script>

import toolBar from '@/components/ToolBar/index'
import radioSetting from '@/components/radioSetting/index'
import {Local,Cookie} from '@/../static/utils/storage'
import {mapGetters} from 'vuex'

export default {
	components:{
		toolBar,
		radioSetting
	},
	data(){
		return {
			setInfo:{
				showZhaiyao:Local.get('system_showZhaiyao') || false,
				showNotice:Local.get('system_showNotice') || false,
				isClickGetNews:Local.get('system_isClickGetNews') || false,
				fontSize:Local.get('system_fontSize') || '中',
				picDownload:Local.get('system_picDownload') || '最佳效果（下载大图）',
				notice:Local.get('system_picDownload') || '每次提醒',
				storage:""
			},
			fontSizeShow:false,
			picDownloadShow:false,
			noticeShow:false,
			fontSizeOptions : [{label: '小',value: '小'},{label: '中',value: '中'},{label: '大',value: '大'},{label: '特大',value: '特大'}],
			picDownloadOptions : [{label: '最佳效果（下载大图）',value: '最佳效果（下载大图）'},{label: '较省流量（智能下图）',value: '较省流量（智能下图）'},{label: '极省流量（不下载图）',value: '极省流量（不下载图）'}],
			noticeOptions : [{label: '提醒一次',value: '提醒一次'},{label: '每次提醒',value: '每次提醒'}]
		}
	},
	computed:{
		isLogin(){
			return this.$store.state.user.isLogin||Cookie.get('user_userName').length>0;	
		},
		...mapGetters(['user'])
	},
	methods:{
		clearStorage(){
			this.$confirm('确定要删除所有缓存吗？回答草稿、离线内容及图片均会被清除。','提示').then(({ result,value })=>{
				if(result){
					Local.clear();
					this.$set(this.setInfo,'storage',"");
				}
			}).catch(err=>{

			})
		},
		loginOut(){
			this.$confirm("退出当前账号，将不能同步收藏，发布评论和云端分享等。",'退出确认',{
				okLabel:'确认退出',
				cancelLabel: '取消'
			}).then(({ result, value })=>{
				if(result){
					this.$store.dispatch('user/loginOut');
					this.$router.animate=2;
					this.$router.push('/account');
				}
			}).catch(err=>{

			})
		},
		save(){
			Local.set({
				system_showZhaiyao:this.setInfo.showZhaiyao,
				system_showNotice:this.setInfo.showNotice,
				system_isClickGetNews:this.setInfo.isClickGetNews
			})
			this.$set(this.setInfo,'storage',this.getStorage());
		},
		getStorage(){
			if(!Local.storage) {
				console.log('浏览器不支持localStorage');
			}
			var size = 0;
			for(var item in Local.storage) {
				if(Local.storage.hasOwnProperty(item)) {
					size += Local.storage.getItem(item).length;
				}
			}
			return (size / 1024).toFixed(2) + 'KB';
		},
		fontSizeSet(val){
			Local.set({system_fontSize:val});
			this.$set(this.setInfo,'fontSize',val);
			this.fontSizeShow=false;
		},
		picDownloadSet(val){
			Local.set({system_picDownload:val});
			this.$set(this.setInfo,'picDownload',val);
			this.picDownloadShow=false;
		},
		noticeSet(val){
			Local.set({system_notice:val});
			this.$set(this.setInfo,'notice',val);
			this.noticeShow=false;
		}
	},
	mounted(){
		this.$set(this.setInfo,'storage',this.getStorage());
	}
}
</script>
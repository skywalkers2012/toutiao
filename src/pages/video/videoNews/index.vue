<template>
	<section class="videoNews-wrap">
		<div class="detail" @click.prevent="videoPlay($event)">
			<video-player  class="vjs-custom-skin" 
			ref="videoPlayer"
			:options="playerOptions"
			:playsinline="true"
			>
		</video-player>
		<div class="detailInfo" id="playContent">
			<div class="title">{{videoData.title}}</div>
			<div class="playCount">{{videoData.playCount}}次播放</div>
			<div class="videoTime">{{videoData.time}}</div>
			<div class="df-sa info">
				<div class="leftinfo">
					<div class="authorName" @click.stop="$router.push('/unfinished')" v-show="showAvatar">
						{{videoData.authorName}}
					</div>
					<mu-avatar size="40" class='avatar' @click.stop="$router.push('/unfinished')" v-show="showAvatar">
						<img :src="videoData.avatar">
					</mu-avatar>

					<div v-show="!showAvatar" class="df-sa">
						<span>分享到</span>
						<mu-avatar size="20" class="playAvatar">
							<img src="~@/../static/img/weixin.png">
						</mu-avatar>
						<mu-avatar size="20" class="playAvatar">
							<img src="~@/../static/img/weibo.png">
						</mu-avatar>
					</div>
				</div>
				<div class="rightInfo df-sa">
					<div class="guanzhu" @click='isGuanzhu=!isGuanzhu'>
						<mu-icon value=":icon-guanzhu" class="barIcon" v-show="!isGuanzhu"></mu-icon>
						<span>{{isGuanzhu?"已关注":"关注"}}</span>
					</div>
					<div class="pinglun">
						<mu-icon value=":icon-pinglun" class="barIcon"></mu-icon>
						<span>{{videoData.pinglun}}</span>
					</div>
					<div class="zhuanfa" @click="showSheet=!showSheet">
						<mu-icon value=":icon-more" class="barIcon"></mu-icon>
					</div>
				</div>
			</div>
		</div>
	</div>
	<bottomSheet :open="showSheet" :bindData='items'></bottomSheet>
</section>
</template>

<script>

import { videoPlayer } from 'vue-video-player'
import '@/../static/style/css/video.css'
import bottomSheet from '@/components/bottomSheet/index.vue'

export default {
	components:{
		videoPlayer,
		bottomSheet
	},
	data() {
		return {
			pause:true,
			play:false,
			isGuanzhu:false,
			showAvatar:true,
			showSheet:false,
			items:[
			{id:0,img:"~@/../static/img/toutiao.png",name:"转发"},
			{id:1,img:"~@/../static/img/pengyouquan.png",name:"朋友圈"},
			{id:2,img:"~@/../static/img/weixinhaoyou.png",name:"微信好友"},
			{id:3,img:"~@/../static/img/qqkongjian.png",name:"qq空间"},
			{id:4,img:"~@/../static/img/jiarushoucang.png",name:"加入收藏"},
			{id:5,img:"~@/../static/img/buganxingqu.png",name:"不感兴趣"},
			{id:6,img:"~@/../static/img/ding.png",name:"顶"},
			{id:7,img:"~@/../static/img/cai.png",name:"踩"}
			],
			playerOptions:{
				muted: false,
				playbackRates: [0.5, 1.0, 1.5, 2.0],
				aspectRatio: '16:9',
				fluid: true,
				autoplay:false,
				preload: 'meta',
				language: 'en',
				notSupportedMessage: '此视频暂无法播放，请稍后再试',
				sources: [{
					type: this.videoData.videoType,
					src: this.videoData.src
				}],
				poster: this.videoData.videoImg,
				controlBar: {
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					fullscreenToggle: true  
				}
			}
		}
	},
	props:(['videoData']),
	computed: {
		player() {
			return this.$refs.videoPlayer.player
		},
		playToken(){
			return this.$store.state.video.playToken;
		}
	},
	methods: {
		videoPlay(event){
			if(event.target.id==='playContent'){
				this.$store.state.video.playToken=this.videoData.id;	
				if(this.play){
					this.player.pause();
					this.play=false;
				}else{
					this.showAvatar=false;
					this.player.play();
					this.pause=false;
					this.play=true;
				}
			}
		}
	},
	watch:{
		pause(newVal,oldVal){
			if(this.pause){
				this.player.pause();
				this.pause=false;
			}
		},
		playToken(newVal,oldVal){
			if(newVal!=this.videoData.id){
				this.player.pause();
				this.play=false;
			}
		}
	},
	beforeDestroy(){
		this.$refs.videoPlayer.dispose();
	}
}
</script>

<style lang='less' scoped>

.videoNews-wrap {
	.detail{
		position: relative;
		color: white;
		height: 2.5rem;
		.detailInfo {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			.title {
				font-size: 18px;
				color: #EDEEEF;
				padding: 10px 15px 0 15px;
			}
			.playCount {
				font-size: 14px;
				padding: 5px 0 0 15px;
			}
			.videoTime {
				position: absolute;
				right: 10px;
				bottom: 10px;
				background-color: #373535;
				opacity: 0.4;
				border-radius: 10px;
				font-size: 10px;
				width: 40px;
				height: 20px;
				line-height: 20px;
				text-align: center;
			}
			.avatar{
				position: absolute;
				bottom: 30px;
				left: 20px;
			}
		}
		.info {
			height: 0.4rem;
			line-height: 0.4rem;
			font-size: 14px;
			position: absolute;
			bottom: 0;
			background-color: white;
			width: 100%;
			color: black;
			.leftinfo {
				width: 40%;
				.playAvatar {
					background-color: transparent;
					margin: 0 0.05rem;
				}
				.authorName{
					position: absolute;
					bottom: 0;
					left: 24px;
				}
			}
			.rightInfo {
				width: 60%;
				.guanzhu {
					padding-left: 0.1rem;
				}
			}
		}
	}
	.barIcon {
		width: 0.2rem;
		height: 0.2rem;
	}

}
</style>

<style>
.videoNews-wrap .video-js .vjs-big-play-button {
	top: 1.1rem;
	left: 1.6rem;
	margin-left: 0;
}
.video-js .vjs-control-bar {
	background-color: transparent;
}
</style>
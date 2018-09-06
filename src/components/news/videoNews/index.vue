<template>
	<section class="videoNews-wrap">
		<div class="detail" @click.prevent="videoPlay">
			<video-player  class="vjs-custom-skin" 
			ref="videoPlayer"
			:options="playerOptions"
			:playsinline="true"
			>
		</video-player>
		<div class="detailInfo">
			<div class="title">{{videoData.title}}</div>
			<div class="playCount">{{videoData.playCount}}次播放</div>
			<div class="videoTime">{{videoData.time}}</div>
			<mu-avatar size="48" class='avatar' @click="$router.push('/unfinished')">
				<img :src="videoData.avatar">
			</mu-avatar>
		</div>
	</div>
	<div class="df-sa info">
		<div class="avatar" @click="$router.push('/unfinished')">
			<div class="authorName">
				{{videoData.authorName}}
			</div>
		</div>
		<div class="guanzhu" @click='isGuanzhu=!isGuanzhu'>
			<mu-icon left value=":icon-guanzhu" size='20' v-show="!isGuanzhu"></mu-icon>
			<span>{{isGuanzhu?"已关注":"关注"}}</span>
		</div>
		<div class="pinglun">
			<mu-icon left value=":icon-pinglun" size='20'></mu-icon>
			<span>{{videoData.pinglun}}</span>
		</div>
		<div class="zhuanfa" @click="$set($store.state.video,'showZhuanfa',true)">
			<mu-icon left value=":icon-more" size='20'></mu-icon>
		</div>
	</div>
</section>
</template>

<script>

import { videoPlayer } from 'vue-video-player'
import '@/../static/style/css/video.css'

export default {
	components:{
		videoPlayer
	},
	data() {
		return {
			pause:true,
			play:false,
			isGuanzhu:false,
			playerOptions:{
				muted: false,
				playbackRates: [0.5, 1.0, 1.5, 2.0],
				aspectRatio: '16:9',
				fluid: true,
				autoplay:false,
				preload: 'auto',
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
		videoPlay(){
			this.$store.state.video.playToken=this.videoData.id;	
			if(this.play){
				this.player.pause();
				this.play=false;
			}else{
				this.player.play();
				this.pause=false;
				this.play=true;
			}
		}
	},
	watch:{
		pause:function(newVal,oldVal){
			if(this.pause){
				this.player.pause();
				this.pause=false;
			}
		},
		playToken:function(newVal,oldVal){
			if(newVal!=this.videoData.id){
				this.player.pause();
				this.play=false;
			}
		}
	}
}
</script>

<style lang='less' scoped>

.videoNews-wrap {
	.detail{
		position: relative;
		color: white;
		.detailInfo {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			.title {
				font-size: 16px;
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
				bottom: -10px;
				left: 20px;
			}
		}

	}
	.info {
		height: 50px;
		color: black;
		font-size: 14px;
		position: relative;
		color: #4A4A4A;
	}

}
</style>

<style>
.videoNews-wrap .video-js .vjs-big-play-button {
	top: 1.1rem;
	left: 1.6rem;
	margin-left: 0;
}
</style>
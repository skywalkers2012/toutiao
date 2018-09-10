<template>
	<div class="video-wrap" @click='close($event)'>
		<div class="videoContent">
			<video-player class="vjs-custom-skin" 
			ref="minVideo"
			:options="playerOptions"
			:playsinline="true" >
		</video-player>
		<div class="detail">
			<div class="title">{{videoData.title}}</div>
			<div class="info">
				<mu-icon value=":icon-video" size="20"></mu-icon>
				<span class="playCount">{{videoData.playCount}}万次播放</span>
				<span class="zanCount">{{videoData.pinglun}}万赞</span>
			</div>
		</div>
		<div class="clickProcess" @click="clickProcess($event)" v-show="!showClose" id="markCss">
			<mu-icon value=":icon-close" class="closeIcon" v-show="!showClose" id="delItem" ref="all"></mu-icon>
		</div>
	</div>
	<div v-show="false" id="closeBtn">
	</div>
</div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import '@/../static/style/css/video.css'
import Vue from 'vue'

export default {
	components:{
		videoPlayer
	},
	data() {
		return {
			playerOptions:{
				muted: false,
				playbackRates: [0.5, 1.0, 1.5, 2.0],
				autoplay:false,
				language: 'en',
				preload: 'meta',
				notSupportedMessage: '此视频暂无法播放，请稍后再试',
				sources: [{
					type: this.videoData.videoType,
					src: this.videoData.src
				}],
				poster: this.videoData.videoImg,
				width:document.documentElement.clientWidth/2,
				height:250,
			},
			showClose:false
		}
	},
	props:(['videoData']),
	computed: {
		player() {
			return this.$refs.minVideo.player
		}
	},
	methods: {
		close(event){
			if(event.target.id==='closeVideo'){
				this.player.pause();
				this.player.exitFullscreen();	  
				this.player.isFullscreen(false);  
				this.$refs.minVideo.$el.querySelector('.closeVideo').style="display:none";
			}
		},
		clickProcess(event){
			if(event.target.id==="markCss"){
				if(!this.player.isFullscreen()){  
					this.player.play(); 
					this.player.requestFullscreen(); 	
					this.player.isFullscreen(true);	
					this.$refs.minVideo.$el.querySelector('.closeVideo').style="display:block!important";
				}
			}else if(event.target.id==="delItem"){
				this.$emit('delVideo');
			}
		}
	},
	mounted(){
		var component = Vue.extend({
			template: "<div class='closeVideo' @click='close($event)'><mu-icon value=':icon-close' color='white' size='24' id='closeVideo'></mu-icon></div>",
			methods:{
				close(){ 
				}
			}
		})
		var closeBtn=new component().$mount("#closeBtn");
		this.$refs.minVideo.$el.querySelector('.video-js').appendChild(closeBtn.$el);
		this.$refs.minVideo.$el.querySelector('video').setAttribute('x5-video-orientation', 'portraint');
		this.$refs.minVideo.$el.querySelector('video').setAttribute('x5-video-player-fullscreen', true);
		this.$refs.minVideo.$el.querySelector('video').style="object-fit: fill";
		
	},
	beforeDestroy(){
		this.$refs.minVideo.dispose();
	}
}
</script>

<style lang='less' scoped>
.video-wrap {
	position: relative;
	.videoContent {	
		.detail {
			position: absolute;
			bottom: 0;
			left: 0;
			padding: 0 0.1rem;
			color: white;
			.title {
				font-size: 14px;
				text-overflow: ellipsis;
				overflow: hidden;
				height: 0.2rem;	
			}
			.info {
				font-size: 12px;
				margin: .1rem 0;
				.zanCount {
					position: absolute;
					right: 0.1rem;
					bottom: 0.1rem;
				}
			}
		}

	}
	.clickProcess {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border: 1px solid #ccc;
	}
	.closeIcon {
		position: absolute;
		top: 0.1rem;
		right: 0.1rem;
		color: white;
	}
}
</style>

<style>
.video-wrap	.vjs-custom-skin > .video-js .vjs-big-play-button{
	opacity: 0 !important;
	height: 100% !important;
	width: 100% !important;
	border-radius: 0 !important;
	top: 0 !important;
	left: 0 !important;
	margin-left: 0 !important;
	margin-top: 0 !important;
}

.video-wrap	.vjs-poster {
	display: none;
}
.video-wrap	.vjs-has-started .vjs-control-bar {
	display: none;
}

.video-wrap	.closeVideo {
	position: absolute;
	top: 0.1rem;
	left: 0.1rem;
	color: white;
	display: none;
}


</style>
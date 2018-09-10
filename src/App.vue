<template>
	<div id="app">
		<transition  :name="transitionName" mode="out-in">
        <router-view id="view"</router-view>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import animate from 'animate.css'

export default {
        data() {
            return {
                transitionName:''
            }
        },
        watch: {
            $route(to, from) {
                var animate = this.$router.animate || to.meta.slide
                if (!animate) {
                    this.transitionName = ''
                } else {
                    this.transitionName = animate === 1 ? 'slide-left': animate === 2 ? 'slide-right': ''
                }
                this.$router.animate = 0
            }
        }
    }
</script>

<style lang="less" scoped>
#app {
 width: 100%;
 height: 100%;
 .login-active {
  opacity: 1;
  top: 0;
}
}
#view {
 position: absolute;
 left: 0;
 top: 0;
 width: 100%;
 height: 100%;
 transition: all 0.1s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
 opacity: 0;
 transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
 opacity: 0;
 transform: translate(-100%, 0);
}



.slide-top-enter,
.slide-bottom-leave-active {
 opacity: 0;
 transform: translate(0, 100%);
}

.slide-top-leave-active,
.slide-bottom-enter {
 opacity: 0;
 transform: translate(0, -100%);
}
</style>

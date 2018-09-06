<template>
    <div class="login">
        <div class='close' @click="$emit('closeLogin')">
            <mu-icon value=':icon-close'></mu-icon>
        </div>
        <div class='title df-sa'>登录你的头条，精彩永不丢失</div>
        <div class='df-sa'>
            <div class='shuru df-sb'>
                <input type="number" class='haoma' placeholder="12345678911" v-model='userName'>
                <div class='tips'>发送验证码</div>
            </div>
        </div>
        <div class='df-sa'>
            <div class='yanzhengma shuru df-sb'>
                <input type="text" placeholder="请输入验证码"  v-model='pwd'>
            </div>
        </div>
        <div class="df-sa">
            <div class="loginSubmit shuru df-c" @click='login'>
                <span>进入头条</span>
            </div>
        </div>

        <div class='xieyi df-c'>
            点击查看<span>”用户协议“</span>和<span>”隐私政策“</span>
        </div>
        <div class='df-c'>
            <mu-button flat color="primary">账号注册</mu-button>
            <mu-button flat color="primary">密码登录</mu-button>
        </div>
        <div class="bottom" v-show="hidshow">
            <div class="df-sa">
                <mu-avatar size='50' color="white">
                    <img src="~@/../static/img/weixin.png">
                </mu-avatar>
                <mu-avatar size='50' color="white">
                    <img src="~@/../static/img/qq.png">
                </mu-avatar>
                <mu-avatar size='50' color="white">
                    <img src="~@/../static/img/weibo.png">
                </mu-avatar>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.login {
    border-radius: 10px;
    background-color: #fafafa;
    .close {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 0.2rem;
    }
    .title {
        font-size: 20px;
        height: 1rem;
    }
    .shuru {
        width: 90%;
        height: 0.5rem;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin-top: 0.2rem;
        background-color: white;
        position: relative;
        input {
            border: none;
            font-size: 0.16rem;
            line-height: 0.4rem;
            text-indent: 0.3rem;
            outline: none;
        }
        .haoma{
            height: 60%;
            width: calc(100% - 1rem);
            border-right: 1px solid #ccc;
        }

    }
    .loginSubmit {
        background-color: #F9ABAB;
        color: white;
        font-size: 0.18rem;
    }
    .xieyi {
        font-size: 0.12rem;
        margin-top: 0.15rem;
        span {
            color: #6680A6;
        }
    }
    .yanzhengma{
        input {
            width: 100%;
        }
    }
    .tips {
        font-size: 0.16rem;
        position: absolute;
        right: 0.1rem;
    }
    .bottom {
        position: fixed;
        bottom: 0.1rem;
        width: 100%;
        img {
            width: 70%;
            height: 70%;
        }
    }
}

</style>

<script>
export default {
    data(){
        return {
            userName:'',
            pwd:'',
            docmHeight: document.documentElement.clientHeight,  
            showHeight: document.documentElement.clientHeight, 
            hidshow:true 
        }
    },
    watch:{
        showHeight:function() {
            if(this.docmHeight > this.showHeight){
                this.hidshow=false
            }else{
                this.hidshow=true
            }
        }
    },
    methods:{
       async login(){
        try{
         await this.$store.dispatch('user/login',{userName:this.userName,pwd:this.pwd}).then(res=>{
             this.$set(this.$store.state.user.footerBarList, 4, {title: '我的', icon: 'account', path: '/account'});
             this.$emit('closeLogin');
         }).catch(err=>{
            this.$alert(err, '提示', { okLabel: '知道了'});
        });
     }
     catch(err){

     }       
 }
},
mounted(){
    window.onresize = ()=>{
        return(()=>{
            this.showHeight = document.body.clientHeight;
        })()
    }
}
}
</script>

<template>
  <div>
    <mt-header fixed title="刺猬影院"></mt-header>
    <div class="my">
      <div class="my_pic">
        <img src="../assets/my.jpg" alt>
      </div>
        <div class="my_name">
            <p>请先登录</p>
        </div>
    </div>
    <div class="mui-content">
      <div class="mui-row">
        <div class="mui-col-sm-2 mui-col-xs-2">
          <p class="mui-table-view-cell ">
            <span class="iconfont icon-wodedangxuan wode"></span>
          </p>
        </div>
        <div class="mui-col-sm-2 mui-col-xs-2">
          <p class="mui-table-view-cell text-left">
            账号：
          </p>
        </div>
        <div class="mui-col-sm-8 mui-col-xs-8">
          <p class="mui-table-view-cell text-left">
            <input type="text" v-model="username">
          </p>
        </div>
      </div>
      <div class="mui-row">
        <div class="mui-col-sm-2 mui-col-xs-2">
          <p class="mui-table-view-cell ">
            <span class="iconfont icon-mima wode"></span>
          </p>
        </div>
        <div class="mui-col-sm-2 mui-col-xs-2">
          <p class="mui-table-view-cell text-left">
            密码：
          </p>
        </div>
        <div class="mui-col-sm-8 mui-col-xs-8">
          <p class="mui-table-view-cell text-left">
            <input type="password" v-model="password">
          </p>
        </div>
      </div>
      <div class="mui-row btn">
        <div class="mui-col-sm-12 mui-col-xs-12">
          <p class="mui-table-view-cell ">
            <van-button type="warning" size="large" @click="login">登录</van-button>
          </p>
        </div>
      </div>
    </div>
    

    
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      var _this = this;
      this.$axios
        .post(_this.$store.state.dataUrl + "api/getUser", {
          username: _this.username,
          password: _this.password
        })
        .then(result => {
            if(result.data.code == 200){
                sessionStorage.token = result.data.token;
                _this.$router.push('/movie')
            }else{
                Toast({
                    message: '登录失败',
                    position: 'bottom',
                    duration: 4000
                });
                _this.username = ''
                _this.password = ''
            }
        });
    }
  },
  created() {
    this.$store.state.showbottomNav = false; //显示底部导航
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: #e56d57;
}

.my {
  margin-bottom: 40px;
  margin-top: 10px;
  .my_pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
    img {
      display: block;
      width: 100px;
      height: 100px;
    }
  }
  .my_name{
        background-color: #fff;
		text-align: center;
		margin: 0 auto;
		p{
			padding:5px;
			color: black;
			font-size: 16px;

		}
	}
}
.mui-content{
    .mui-row{
        line-height: 50px;
        background-color: #fff;
        border-bottom:1px solid #ccc;
        .wode{
            position: relative;
        }
        .wode::after{
            content: '';
            display: block;
            width: 1px;
            height: 46px;
            background-color: #ccc;
            position: absolute;
            top: -14px;
            right: -10px;
        }
    }
    p{
        text-align: center;
        padding:0;
        margin: 0;
    }
    p.text-left{
        text-align: left;
    }
    span{
        color:#e56d57;
        font-size: 22px;
    }
    input{
        padding: 0;
        margin:0;
    }
}
.mui-row.btn{
    margin-top:10px;
}
.mui-row.btn span{
    color: #fff; 
    font-size: 16px;
}
</style>



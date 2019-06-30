<template>
  <div id="detail">
    <div id="film">
      <header class="mint-header is-fixed">
        <div class="mint-header-button is-left">
          <a href="javascript:;" class="page-back router-link-active">
            <i class="mintui mintui-back" @click.stop="$router.back(-1)"></i>
          </a>
        </div>
        <h1 class="mint-header-title">{{this.$store.state.filmData.title}}</h1>
        <div class="mint-header-button is-right"></div>
      </header>

      <div class="content">
        <div class="img">
          <img :src="this.$store.state.filmData.img">
        </div>
        <div class="msg">
          <p class="title">{{this.$store.state.filmData.title}}</p>
          <p>{{this.$store.state.filmData.nailName}}</p>
          <p>
            
            <span class="score">{{this.$store.state.filmData.score>10?"想看人数："+this.$store.state.filmData.score:"评分："+this.$store.state.filmData.score}}</span>
          </p>
          <p>{{this.$store.state.filmData.type}}</p>
          <p>{{this.$store.state.filmData.country}}/{{this.$store.state.filmData.totalTime}}</p>
          <p>{{this.$store.state.filmData.date}}上映</p>
        </div>
      </div>
      <div class="btn">
        <p @click="collect" class="collect">
          <span class="iconfont icon-aixin"></span>
          收藏</p>
        <p>
          <a href="#talking">
            <span class="iconfont icon-pinglun"></span>
            评论</a>
        </p>
      </div>

      <div class="filmContent">
        <div
          v-if="!autoHeight"
          style="height:50px;"
          class="city_list"
          id="city_list"
        >{{this.$store.state.filmData.content}}</div>
        <div
          v-if="autoHeight"
          style="height:auto"
          class="city_list"
          id="city_list"
        >{{this.$store.state.filmData.content}}</div>
        <div class="bottomIcon" >
          <div class="box" v-if="!autoHeight" @click="autoHeight = !autoHeight">
            <p class="icon"  style="top:5px;" ></p>
          </div>
          <div class="box" v-if="autoHeight" @click="autoHeight = !autoHeight">
            <p class="icon"  style="top:-4px;" ></p>
          </div>
        </div>
      </div>
    </div>
    <!--子组件： 评论 传递参数 talklistchild-->
    <talkFilm :talklistchild=talkList></talkFilm>

    <div class="mui-content" id="talking">
      <div class="mui-row talking">
        <div class="mui-col-sm-11 mui-col-xs-11">
          
          <textarea id="textarea" rows="1" placeholder="评论" v-model="talking"></textarea>
        </div>
        <div class="mui-col-sm-1 mui-col-xs-1" @click="addtalkList">
          <span class="mui-icon mui-icon-paperplane"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import talkFilm from "./Talkfilm.vue";
import $ from "jquery/dist/jquery.js";
export default {
  data() {
    return {
      index: null,
      autoHeight: false,
      talking: '',
      talkList:[]
    };
  },
  
  methods: {
    addtalkList(){
      this.talkList.push({
        img:'../assets/my.jpg',
        name:'刺猬',
        time:new Date(),
        content:this.talking
      })
      this.talking = ''
    },
    //收藏
    collect(){
        //将收藏数据存储到localStorage中
      $('.collect span').addClass('turnHeart')  
      var collectList = this.$store.state.filmData;
      var arr = localStorage.collectList?localStorage.collectList:'[]' //注意'[]' 以字符串存储
      var array = JSON.parse(arr)
      var movieId = this.$store.state.filmData.movieId
      var index = JSON.stringify(array).indexOf(movieId)
      if(index == -1){
        array.unshift(collectList)
        localStorage.setItem('collectList',JSON.stringify(array)) 
      }else{
        array.forEach((element,i) => {
          if(element.movieId == movieId){
            array.splice(i,1);
          }
        })
        localStorage.setItem('collectList',JSON.stringify(array)) 
        $('.collect span').removeClass('turnHeart')  
      }

    }
  },
  components: {
    talkFilm
  },
  created() {
    this.$store.state.showbottomNav = false;
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
header {
  background-color: #e56d57;
  position: relative;
}
//收藏
.turnHeart{
  color: #e56d57;
}
.btn{
  a{
    color: #8f8f94;
  }
}
a.router-link-active {
  color: #000;
  font-size: 30px;
}
.mintui {
  font-size: 20px;
  color: #fff;
}

#film {
  .content {
    height: 140px;
    width: 100%;
    display: flex;
    .img {
      flex: 3;
      padding: 5px;
      text-align: center;
      background-color: #fff;
      img {
        display: block;
        width: 100px;
        height: 130px;
      }
    }
    .msg {
      flex: 6;
      padding: 5px 0;
      background-color: #fff;
      position: relative;
      p {
        color: #8f8f94;
        margin-bottom: 0px;
        font-size: 10px;
      }
      p.title {
        font-size: 14px;
      }
      span.score {
        font-size: 14px;
        color: orangered;
      }
    }
  }
  .btn {
    height: 50px;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    line-height: 50px;
    p {
      float: left;
      background-color: #ccc;
      flex: 1;
      margin: 10px 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
}
.filmContent {
  .bottomIcon {
    background-color: #fff;
    height: 10px;
    .box {
      text-align: center;
      position: relative;
      width: 10px;
      height: 10px;
      margin: 0 auto;
      overflow: hidden;
      .icon {
        left: 0px;
        position: absolute;
        display: inline-block;
        border-top: 5px solid black;
        border-bottom: 5px solid black;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        top: -2px;
      }
    }
  }

  .city_list {
    margin-top: 5px;
    position: relative;
    background-color: #fff;
    text-align: left;
    font-size: 14px;
    overflow: hidden;
  }
}

//评论
.talking {
  textarea{
    margin: 0;
    padding: 5px;
    outline: none;
  }
  span {
    display: inline-block;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 30px;
    color: #e56d57;
  }
}
</style>


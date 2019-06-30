<template>
  <div id="detail" v-if="filmData!=null">
    
    <div id="film">
        <router-link tag="div" class="content" :to="{ path: '/movieDetail'}">       
         <div class="img">
            <img :src="filmData.img" alt="">
        </div>
        <div class="msg mui-navigate-right"> 
            <p class="title" >{{filmData.title}}</p>
            <p>{{filmData.nailName}}</p>
            <p v-if="index">评分：<span class="score"> {{filmData.score}} </span></p> 
            <p v-if="!index">想看人数：<span class="score"> {{filmData.score}} </span></p> 
            <p>{{filmData.type}}</p> 
            <p>{{filmData.country}}/{{filmData.totalTime}}</p>
            <p>{{filmData.date}}上映</p>
        </div>
     </router-link>
    </div>
    <div>
      <cinema></cinema>
    </div>
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <router-link tag="a" to="/movie" class="page-back router-link-active">
          <i class="mintui mintui-back"></i>
        </router-link>
      </div>
      <h1 class="mint-header-title">电影赛事</h1>
      <div class="mint-header-button is-right"></div>
    </header>
  </div>
</template>

<script>
import cinema from "./Cinema.vue"
export default {
  data() {
    return {
      index:true,
      filmData:null
    };
  },
  components:{
    cinema
  },
  created() {
    this.$store.state.showbottomNav = false;//不显示底部导航栏
    this.fetchData(); //获取数据
  },

  methods: {
    fetchData() {
      var movieId = this.$route.query.movieId;

      //1-->正在热映  2->即将上映
      var index = this.$route.query.index
      var url= this.$store.state.dataUrl+"api/moviesList?&limit=" + 1 + "&page=" + 0 + "&text=" + movieId;
      if(index == 2){
        this.index = false
          url= this.$store.state.dataUrl+"api/moviesComeList?&limit=" + 1 + "&page=" + 0 + "&text=" + movieId;
      }
      this.$axios
        .get(url)
        .then(result => {
          this.filmData = result.data.data[0],
          this.$store.state.filmData = result.data.data[0]
          this.$store.state.filmId = movieId
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: #e56d57;
  position: relative;
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
      img{
          display: block;
          width:100px;
          height:130px;
      }
    }
    .msg {
      flex: 6;
      padding:5px 0;
      background-color: #fff;
      position: relative;
      p{
          color:#8F8F94;
          margin-bottom: 0px;
          font-size: 10px;
      }
      p.title{
         font-size: 14px;
      }
      span.score{
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
      p{
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
.mui-navigate-right:after{
    right: 10px;
    background-color: #ccc;
    width:30px;
    height: 30px;
    border-radius: 50%;
    font-size: 30px;
    color:#fff;
    content: '\e583';
}
.mui-navigate-right{
  p{
    padding: 1px 0;
  }
}

</style>


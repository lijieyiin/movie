<template>
  <div>
    <div id="detail" v-if="list!=null">
      <div id="film">
        <header class="mint-header is-fixed">
          <div class="mint-header-button is-left">
            <a href="javascript:;" class="page-back router-link-active">
              <i class="mintui mintui-back" @click.stop="$router.back(-1)"></i>
            </a>
          </div>
          <h1 class="mint-header-title">{{list.cinemaName}}</h1>
          <div class="mint-header-button is-right"></div>
        </header>

        <div class="content">
          <div class="img">
            <img :src="cinemaImg">
          </div>
          <div class="msg">
            <span class="score">{{list.cinemaName}}</span>
            <p>
              <span class="title">电话：{{list.cinemaTel}}</span>
            </p>
            <p>地址：{{list.cinemaAddress}}</p>
          </div>
        </div>
      </div>
    </div>
    <myswiper></myswiper>
  </div>
</template>

<script>
import myswiper from '../components/cinemaDetailContent.vue'
export default {
  
  data() {
    return {
      cinemaImg: null,
      list: null,
    };
  },
  components:{
    myswiper
  },
  created() {
    this.$store.state.showbottomNav = false;//不显示底部导航栏
    this.fetchData(); //获取数据
  },
  methods: {
    fetchData() { 
      var cinemaId = this.$route.query.cinemaId;
      this.cinemaImg = this.$route.query.cinemaImg;
      this.$store.state.cinemaImg = this.$route.query.cinemaImg
      this.$store.state.cinemaId = this.$route.query.cinemaId
      this.$axios
        .get(
          this.$store.state.dataUrl+"api/findMoviesInfo?&cinemaId=" + cinemaId
        )
        .then(result => {
          this.list = result.data.data;
          // this.$store.state.cinemaDateilContent = result.data.data
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  background-color: #e56d57;
  position: relative;
  font-size: 18px;
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
    height: auto;
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
        height: auto;
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
    //   height: 50px;
    overflow: hidden;
  }
}

</style>


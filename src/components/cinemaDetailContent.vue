<template>
  <div v-if="list!=null">
    <!--不加v-if会出现跟父组件 cinemaDetail.vue渲染异步问题-->
    <!-- myswiper 电影图片轮播图 -->

    <!-- 父组件跟子组件之间进行数据传递 swiperlistchild->父向子传递   childIndex->子向父传递-->
    <myswiper :swiperlistchild=swiperlist v-on:childIndex='childIndex'></myswiper>
    <div class="content">
      <p>
        {{movieName}}
        <span>{{movieScore>11?movieScore+'人想看':movieScore+'分'}}</span>
      </p>
      <p>{{movieTime}} | {{movieType}} | {{movieActor}}</p>
    </div>
    <div class="showTime">
      <div class="box2">
        <div
          :class="i==0?'list active':'list'"
          @click="clickTab(i,item)"
          v-for="(item,i) in movieShow[movieIndex]"
          :key="i"
          v-show="item!=''"
        >{{item}}</div>
      </div>
    </div>
    <ul class="mui-table-view adv">
      <li class="mui-table-view-cell">
        <!-- <a class="mui-navigate-right"> -->
        <span>折扣卡</span>
        <span>购票享低价，首单2张立减10元</span>
        <!-- </a> -->
      </li>
    </ul>

    <!-- 电影的播放时间 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <div
          class="mui-content"
          v-for="(item1,j) in list.movieWatchTime"
          :key="j"
        >
          <div class="mui-row">
            <div class="mui-col-sm-3 mui-col-xs-3">
              <p class="startTime">{{item1.beginTime}}</p>
              <p class="small">{{item1.endTime}}</p>
            </div>
            <div class="mui-col-sm-3 mui-col-xs-3">
              <p class="middleSize">{{item1.language}}</p>
              <p class="small">{{item1.hall}}</p>
            </div>
            <div class="mui-col-sm-3 mui-col-xs-3 text-center line-height">
              <p class="startTime colorPrice">￥{{item1.price}}</p>
            </div>
            <div class="mui-col-sm-3 mui-col-xs-3 text-right">
              <van-button
                type="danger"
                :to="{ path: '/ticket', query: {movieIndex:index,cinemaId: cinemaId,movieId:movieId,timeIndex:movieIndex,j:j}}"
                size="small"
              >购票</van-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery/dist/jquery.js";
import myswiper from '../components/swiper.vue'
export default {
  data() {
    return {
      movieIndex: 0,
      movieId: null,
      cinemaId: null,
      movieshwowTime: null,
      list: null,
      index: 0,
      movieName: null,
      movieScore: null,
      movieActor: null,
      movieTime: null,
      movieType: null,
      movieImg: null,
      movieShow: null,
      swiperlist:null,
      count:0,
    };
  },
  components: {
    myswiper
  },
  methods: {
    clickTab(i, item) {
      this.movieshwowTime = item;
      this.index = i;
      $(".list").removeClass("active");
      $(".list")
        .eq(i)
        .addClass("active");
    },
    childIndex(index){
          this.movieId = this.list.movieId[index];
          this.movieName = this.list.movieName[index];
          this.movieScore = this.list.movieScore[index];
          this.movieActor = this.list.movieActor[index];
          this.movieTime = this.list.movieTime[index];
          this.movieType = this.list.movieType[index];
          this.movieIndex = index;
    },
    getData() {
      var cinemaId = this.$store.state.cinemaId
      var _this = this;
      this.$axios
        .get(
          this.$store.state.dataUrl+"api/findMoviesInfo?&cinemaId=" + cinemaId
        )
        .then(result => {
            _this.list = result.data.data;
            this.$store.state.cinemaDateilContent = result.data.data
            _this.cinemaId = _this.$route.query.cinemaId;
            _this.movieName =  _this.list.movieName[0];
            _this.movieImg =  _this.list.movieImg;
            _this.swiperlist =  _this.list.movieImg
            _this.movieShow =  _this.list.movieShow;

            _this.movieScore =  _this.list.movieScore[0];
            _this.movieActor =  _this.list.movieActor[0];
            _this.movieTime =  _this.list.movieTime[0];
            _this.movieType =  _this.list.movieType[0];
            _this.movieId =  _this.list.movieId[0];
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  async created() {
      await this.getData()
  },
 };
</script>
<style lang="scss" scoped>
header {
  background-color: #e56d57;
  position: relative;
}

.swiper-container {
  width: 100%;
  height: 100%;
  margin-top: 5px;
  background-color: #fff;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  width: 30px;
  height: 120px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;

  img {
    width: 100%;
    height: 100%;
  }
}
.swiper-slide:not(.swiper-slide-active) {
  transform: scale(0.8);
}
.swiper-slide-active {
  border: 2px solid red;
}

.content {
  padding-top: 10px;
  text-align: center;
  background-color: #fff;
  p {
    margin-bottom: 0px;
  }
  p:nth-child(1) {
    color: black;
    font-size: 16px;
    font-weight: 600;
    span {
      color: orangered;
    }
  }
  p:nth-child(2) {
    font-size: 12px;
    color: grey;
  }
}

//播放时间
.showTime {
  width: 100%;
  overflow-x: scroll;
  padding: 5px 5px 0 5px;
  background-color: #fff;
  margin: 2px 0;
  font-size: 14px;
  .box2 {
    white-space: nowrap;
    display: inline-block;
    .list {
      width: 80px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      text-align: center;
    }
    .list.active {
      border-bottom: 2px solid red;
    }
  }
}
/* for Chrome  隐藏滚动条*/
.showTime::-webkit-scrollbar {
  display: none;
}

.mui-table-view-cell > a:not(.mui-btn) {
  margin: -15px -15px;
}

.mui-table-view.adv {
  font-size: 10px;
  .mui-table-view-cell:nth-of-type(1) {
    color: #23a8f2;
    span:nth-child(1) {
      padding: 0 5px;
      display: inline-block;
      height: 18px;
      line-height: 18px;
      background-color: #23a8f2;
      color: #fff;
      text-align: center;
      margin-right: 10px;
      margin-left: 10px;
    }
  }
  .mui-table-view-cell:nth-of-type(2) {
    background-color: #fff8ee;
    color: #dac127;
    span:nth-child(1) {
      padding: 0 5px;
      display: inline-block;
      height: 18px;
      line-height: 18px;
      background-color: #dac127;
      color: #fff;
      text-align: center;
      margin-right: 10px;
      margin-left: 10px;
    }
  }
}

// 点击电影播放列表 变灰色高亮
.mui-table-view-cell.mui-active {
  background-color: #ccc;
}
.mui-row {
  border-bottom: 1px solid #ccc;
  padding: 11px 5px;
  .text-right {
    text-align: right;
  }
  .startTime {
    font-size: 16px;
  }
  .small {
    font-size: 10px;
    color: #ccc;
  }
  .middleSize {
    font-size: 14px;
  }
  .colorPrice {
    color: red;
  }
}
.mui-table-view-cell {
  position: relative;
  overflow: hidden;
  -webkit-touch-callout: none;
}
.mui-content {
  background-color: #fff;
}
.line-height {
  // line-height: 42px;
}
</style>


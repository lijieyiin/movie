<template>
  <div>
      <header class="mint-header is-fixed">
        <div class="mint-header-button is-left">
          <a href="javascript:;" class="page-back router-link-active">
            <i class="mintui mintui-back" @click.stop="$router.back(-1)"></i>
          </a>
        </div>
        <h1 class="mint-header-title">{{cinemaName}}</h1>
        <div class="mint-header-button is-right"></div>
      </header>

    <div class="movieInfo">
      <p>{{movieName}}</p>
      <p>
        {{showTime}}日 {{beginTime}}
        <span v-if="language!=undefined">{{language}}</span>
      </p>
    </div>
    <div class="seat">
      <div class="seat_name">{{hall}}</div>
      <div class="seat_center">银屏中央</div>
      <div v-for="j in cols" :key="j">
        <span>{{j}}</span>
        <i v-for="i in rows" :key="i"  class="iconfont icon-zuowei myself canselect" @click="showSeat(i,j)"></i>
      </div>
    </div>

    <div class="bottom_info">
      <div class="seat_choice">
        <i class="iconfont icon-zuowei canselect">
          <span>可选</span>
        </i>
        <i class="iconfont icon-zuowei selected">
          <span>不可选</span>
        </i>
        <i class="iconfont icon-zuowei youselected">
          <span>已选</span>
        </i>
      </div>
      <div class="myselectseat">
        <div>
          <p>已选座位</p>
          <div class="myselect" v-for="(item,i) in myseatList" :key="i">
            <p>{{item.seat}}</p>
            <p>￥{{item.price}}</p>
            <span class="mui-icon mui-icon-closeempty" @click="delSeat(i)"></span>
          </div>
        </div>
        <div>
          <van-button type="danger" @click="confirm" size="large">￥{{sum}}请确认选座</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import $ from "jquery/dist/jquery.js";
export default {
  data() {
    return {
      rows:10,
      cols:8,
      cinemaName: null,
      showTime: null,
      movieName: null,
      beginTime: null,
      language: null,
      hall: null,
      price:0,
      myseatList:[],//已经选的座位
      count:0,
      seatlist:[],//记录选的位置是第几个，来修改座位颜色
      sum:0,
      order:{},
    };
  },
  methods: {
    showSeat(i,j){//选择座位
      var index = (j-1)*10+i-1;
      if(this.seatlist.indexOf(index) != -1){//当前该座位已经选择了
          return
      }
      if(this.count >=4){
        Toast({
          message: '一次最多购买4张',
          position: 'middle',
          duration: 2000,
        });
        return
      }
      this.count++;
      this.myseatList.push({
        seat:j+"排"+i+"座",
         price:this.price
      })
      this.sum += this.price
      this.seatlist.push(index)
      $('.myself').eq(index).addClass('youselected')
    },
    //删除已选的座位
    delSeat(i){
      var index = this.seatlist[i]
      $('.myself').eq(index).removeClass('youselected')
      this.myseatList.splice(i,1);
      this.seatlist.splice(i,1);
      this.count--;
      this.sum -= this.price
    },
    //确认选座
    confirm(){
      if(this.sum==0) {
        Toast({
          message: '请先选择座位',
          position: 'middle',
          duration: 2000,
        });
        return;
      }
      this.order.myseatList = this.myseatList;
      this.order.count = this.count;
      this.order.sum = this.sum; 
      this.$store.commit('wantToOrder',this.order)
      this.$router.push("/buyTicket")
      
    }
  },
  created() {
    this.$store.state.showbottomNav = false;

    //获取用户选择的观影信息
    var movieIndex = this.$route.query.movieIndex;
    var timeIndex = this.$route.query.timeIndex;
    var j = this.$route.query.j;
    this.cinemaName = this.$store.state.cinemaDateilContent.cinemaName;
    this.showTime = this.$store.state.cinemaDateilContent.movieShow[timeIndex][
      movieIndex
    ];
    this.movieName = this.$store.state.cinemaDateilContent.movieName[timeIndex];
    this.beginTime = this.$store.state.cinemaDateilContent.movieWatchTime[
      j
    ].beginTime;
    this.language = this.$store.state.cinemaDateilContent.movieWatchTime[
      timeIndex
    ].language;
    this.hall =  this.$store.state.cinemaDateilContent.movieWatchTime[timeIndex].hall
    this.price =  this.$store.state.cinemaDateilContent.movieWatchTime[timeIndex].price

    //添加信息到订单
    this.order.cinemaId = this.$store.state.cinemaDateilContent.cinemaId;
    this.order.cinemaName = this.cinemaName;
    this.order.movieId = this.$store.state.cinemaDateilContent.movieId[timeIndex];
    this.order.movieImg = this.$store.state.cinemaDateilContent.movieImg[timeIndex];
    this.order.movieName = this.$store.state.cinemaDateilContent.movieName[timeIndex];
    this.order.showTime = this.showTime;
    this.order.beginTime = this.beginTime;
    this.order.language = this.language;
    this.order.hall = this.hall;
    this.order.price = this.price;
      
  }
};
</script>
<style lang="scss" scoped>
.selected {
  color: #e56d57;
}

//头部head
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
//=====

.movieInfo {
  background-color: #fff;

  p:nth-of-type(1) {
    color: black;
    font-size: 16px;
    padding: 6px 0 0px 10px;
  }
  p:nth-of-type(2) {
    padding: 0 0 3px 12px;
  }
  span {
    color: red;
  }
}

.seat {
  text-align: center;
  margin-top: -10px;
  .seat_name {
    background-color: #e0e0e0;
    padding: 2px;
    width: 200px;
    margin: 0 auto;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    font-size: 14px;
  }
  .seat_center {
    background-color: #e0e0e0;
    font-size: 10px;
    padding: 3px;
    width: 60px;
    margin: 0 auto;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 10px;
    color: gray;
    text-emphasis: center;
  }
  span {
    color: #fff;
    background-color: #c3c3c3;
    padding: 5px;
  }
  span:nth-of-type(1) {
    padding-top: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  i {
    font-size: 20px;
    padding: 5px;
  }
}

.seat_choice {
  text-align: center;
  span {
    color: #656565;
    font-size: 14px;
    padding-right: 10px;
  }
}
.canselect {
  color: #fff;
}

.youselected {
  color: #6cbe00;
}
.bottom_info {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
.myselectseat {
  background-color: #fff;
  font-size: 12px;
  padding: 5px;
  overflow: hidden;

  .myselect {
    float: left;
    width: 65px;
    text-align: left;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    position: relative;
    margin-left: 5px;
    p {
      margin: 0;
      padding: 0;
    }
    p:nth-of-type(2) {
      color: red;
      font-size: 10px;
    }
    span {
      position: absolute;
      right: -3px;
      top: 6px;
    }
  }
}

</style>

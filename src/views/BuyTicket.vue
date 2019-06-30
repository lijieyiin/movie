<template>
  <div>
    <header class="mint-header is-fixed">
      <div class="mint-header-button is-left">
        <a href="javascript:;" class="page-back router-link-active">
          <i class="mintui mintui-back" @click.stop="$router.back(-1)"></i>
        </a>
      </div>
      <h1 class="mint-header-title">支付订单</h1>
      <div class="mint-header-button is-right"></div>
    </header>

    <!-- 支付订单 -->
    <div class="order">
      <div class="msg">
        <li>
          影院：
          <span>{{this.$store.state.wantToOrder.cinemaName}}</span>
        </li>
        <li>
          电影：
          <span>{{this.$store.state.wantToOrder.movieName}}</span>
        </li>
        <li>
          场次：
          <span class="time">{{gettime($store.state.wantToOrder.showTime)}}&nbsp;{{$store.state.wantToOrder.beginTime}}</span>
        </li>
        <div class="address">
          <div>座位：{{this.$store.state.wantToOrder.hall}}</div>
          <div>
            <p class="seat" v-for="(item,i) in this.$store.state.wantToOrder.myseatList" :key="i">{{item.seat}}</p>
          </div>
        </div>
      </div>
      <!--总价  -->
      <div class="msg">
        <p class="cal">结算信息</p>
        <li>
          总价：
          <span style="float:right;">{{$store.state.wantToOrder.sum+this.count*3}}元(含服务费：3元/张)</span>
        </li>
        <li style="color:orange;font-size:14px;height:20px;line-height:20px;">猫眼特惠：购票满2张立减10元</li>
        <li>
          还需支付：
          <span style="color:#e56d57;float:right;">
            
            {{sum}}元
          </span>
        </li>
      </div>
      <div class="bottomNav">
        <van-button type="danger" @click="pay" size="large">立即支付</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data(){
    return{
      sum:0,
      count:0,
      num:2,
      discount:10,
    }
  },
  created() {
    this.$store.state.showbottomNav = false; //显示底部导航
    this.count = this.$store.state.wantToOrder.count
    var sum1 = this.$store.state.wantToOrder.sum+this.count*3
    this.sum = this.count>=this.num? sum1 - this.discount : sum1
  },
  methods: {
    pay() {
      
      let instance = Toast({
        message: "支付成功",
        position: "middle",
        iconClass: 'icon icon-success',
      })
      setTimeout(() => {
        instance.close();
        this.$router.push('/order')
      }, 2000);

      //将订单数据存储到localStorage中
      var orderList = this.$store.state.wantToOrder;
      orderList.trueSum = this.sum;
      orderList.orderId = new Date().getTime()*parseInt(Math.random()*10000);
      orderList.cinemaImg = this.$store.state.cinemaImg;
      var arr = localStorage.orderList?localStorage.orderList:'[]' //注意'[]' 以字符串存储
      var array = JSON.parse(arr)
      array.unshift(orderList)
      localStorage.setItem('orderList',JSON.stringify(array)) 
    },
     gettime(date) {
      return "2019年" + date.split(" ")[1] + "日";
    },
  }
};
</script>
<style lang="scss" scoped>
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

// 订单
.order {
  font-size: 16px;
  padding-bottom: 50px;
  .msg {
    margin: 10px;
    .cal {
      font-size: 16px;
      margin-top: 20px;
      margin-bottom: -1px;
    }
    li {
      list-style: none;
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      padding: 0 10px;
      border-bottom: 1px solid #f4f4f4;
    }

    .address {
      line-height: 40px;
      background-color: #fff;
      height: auto;
      padding: 0 10px;
      p {
        color: black;
        margin: 0;
      }
      overflow: hidden;
      div {
        float: left;
      }
      div:nth-of-type(1){
        padding-right:10px;
      }
      .seat {
        font-size: 16px;
        float: left;
        padding-right: 8px;
      }
    }
  }
}
  
.bottomNav{
    position: fixed;
    bottom: 0px;
    width: 100%;
}
.time {
  color: #e56d57;
  font-size: 14px;
}
</style>

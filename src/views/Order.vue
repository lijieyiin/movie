<template>
  <div>
    <mt-header fixed title="订单"></mt-header>
    
    <div class="orderlist" v-if="orderList!=null">
      <div class="order" v-for="(item,i) in orderList" :key="i">
        <p>订单编号：{{item.orderId}}</p>
        <router-link
          tag="li"
          :to="{ path: '/cinemadateil', query: { cinemaId: item.cinemaId ,cinemaImg: item.cinemaImg}}"
        >
          <div class="box">
            <div class="box_left">
              <img :src="item.movieImg" alt>
            </div>
            <div class="box_right">
              <p>{{item.movieName}}</p>
              <p>{{item.cinemaName}}</p>
              <p>{{item.hall}}</p>
              <p class="seat">
                <span v-for="(item1,j) in item.myseatList" :key="j">{{item1.seat}}</span>
              </p>
            </div>
          </div>
          <div class="msg">
            <p class="left">{{gettime(item.showTime)}}&nbsp;{{item.beginTime}}&nbsp;观看</p>
            <p class="right">￥{{item.trueSum}}</p>
          </div>
        </router-link>
        <div class="msg del">
          <p class="right">
            <button
              type="button"
              class="mui-btn mui-btn-danger mui-btn-outlined"
              @click="delOrder(item.orderId)"
            >删除订单</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mui from "../assets/mui/js/mui.js";
export default {
  data() {
    return {
      orderList: null
    };
  },
  created() {
    this.$store.state.showbottomNav = true;
    //从localStorage中获取订单数据
    if(localStorage.orderList!=null){
      this.orderList = JSON.parse(localStorage.orderList);
    }
  },
  methods: {
    gettime(date) {
      return "2019年" + date.split(" ")[1] + "日";
    },
    //删除订单
    delOrder(orderId) {
      var array = JSON.parse(localStorage.orderList);
      array.forEach((element, i) => {
        if (element.orderId == orderId) {
          array.splice(i, 1);
        }
      });
      this.orderList = array;
      localStorage.setItem("orderList", JSON.stringify(array));
    }
  },
  mounted() {
    // 关于如何在vue-cli3.0中引入mui.js和相关扩展
    // http://ask.dcloud.net.cn/article/13509
    mui.init();
  }
};
</script>
<style lang="scss" scoped>
//头部head
header {
  background-color: #e56d57;
}
.mui-table-view .mui-media-object {
  height: 60px;
}

//订单
.orderlist {
  padding-bottom: 55px;
}
.order {
  padding: 10px;
  margin-bottom: 2px;
  font-size: 16px;
  color: black;
  background-color: #fff;
  list-style: none;
  p {
    padding: 0;
    margin: 0;
  }

  .box {
    overflow: hidden;
    .box_left {
      float: left;
      width: 60px;
      height: 65px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .box_right {
      float: left;
      padding-left: 10px;
    }
  }
  .msg {
    overflow: hidden;
    p {
      padding-top: 5px;
      margin: 0;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
      color: #e56d57;
    }
  }
}
</style>

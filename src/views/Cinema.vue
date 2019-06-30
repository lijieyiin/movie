<template>
  <div>
    <mt-header fixed title="影院"></mt-header>
    <mt-navbar v-model="selected">
      <div class="mui-col-sm-3 mui-col-xs-3">
        <div class="city_list">
          <span class="city">广州</span>
          <span class="icon"></span>
        </div>
      </div>
      <div class="mui-col-sm-9 mui-col-xs-9 search_my">
        <div class="search_text">
            <input type="text" class="search_text_input"  v-model="text" placeholder="搜索...">
            <i class="mintui mintui-search" @click="change_search"></i>
        </div>
      </div>
    </mt-navbar>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image width="100%" height="120" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561637135231&di=06806a4f71e724bdf6583d04f9690246&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F337%2F32445.jpg"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image width="100%" height="120" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561636961055&di=bc117d79b95026804e605f338d0094a1&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171210%2F766d14c7f3e94fe7b96d690dd243076f.jpeg"/>
      </van-swipe-item>
      <van-swipe-item>
        <van-image width="100%" height="120" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561637792250&di=7252b2f8cbbc015e114e13042d9152cb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb549e9c5eeb919ba0c98e81ffed6fb0310fa3da6172f6e-l9rORc_fw658"/>
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图end -->

    <mt-navbar v-model="selected">
      <div class="mui-col-sm-4 mui-col-xs-4 border-right">
        <div class="city_list">
          <span class="city">全城</span>
          <span class="icon"></span>
        </div>
      </div>
      <div class="mui-col-sm-4 mui-col-xs-4">
        <div class="city_list">
          <span class="city">品牌</span>
          <span class="icon"></span>
        </div>
      </div>
      <div class="mui-col-sm-4 mui-col-xs-4">
        <div class="city_list">
          <span class="city">特色</span>
          <span class="icon"></span>
        </div>
      </div>
    </mt-navbar>

    <!-- 电影院列表 -->
    <div class="cinemaList">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="(item,i) in lists" :key="i">
          <router-link tag="a" :to="{ path: '/cinemadateil', query: { cinemaId: item.cinemaId ,cinemaImg: item.img}}">
            <img class="mui-media-object mui-pull-left" :src="item.img">
            <div class="mui-media-body">
              <p class="cinemaname">{{item.name}}</p>
              <div class="youhui">
                <span class="icon_youhui icon_youhui1">改签</span>
                <span class="icon_youhui icon_youhui2">小吃</span>
                <span class="icon_youhui icon_youhui3">折扣价</span>
              </div>
              <p class="mui-ellipsis">{{item.address}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- end -->
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import $ from "jquery/dist/jquery.js";
export default {
  data() {
    var _this = this;
    window.onscroll = function() {
      //懒加载
      var scrollT =
        document.documentElement.scrollTop || document.body.scrollTop; //滚动条的垂直偏移
      var scrollH =
        document.documentElement.scrollHeight || document.body.scrollHeight; //元素的整体高度
      var clientH =
        document.documentElement.clientHeight || document.body.clientHeight; //元素的可见高度
      if (scrollT == scrollH - clientH) {//滚动条到底部
        
        if(_this.onscroll){//区别搜索出来的信息

            if(_this.loadBool){//保证请求完数据后，再次滚动才有效
                  _this.loadBool = false;
                  _this.selectAll(5, _this.page + 1, false);
            }
        }
      } 
    };

    return {
      selected: "true",
      limit: 5, //每页数量
      page: 0, //第几页
      lists: null,
      text: "",
      onscroll:true,
      loadBool:true,
    };
  },
  methods: {
    selectAll(limit, page, index) {
    var _this = this
      this.onscroll = true;
      //请求数据
      this.$axios
        .get(
          _this.$store.state.dataUrl+"api/cinemasList?&limit=" +
            limit +
            "&page=" +
            page +
            "&text=" +
            ""
        )
        .then(result => {
          if (index) {
            //首次加载
            this.lists = result.data.data;
          } else {
            //滚动条到达底部
            result.data.data.forEach(element => {
              this.lists.push(element);
            });
          }
          this.page = page;
          this.loadBool = true;//保证加载完数据后再次滚动才有效
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //搜索
    change_search() {
      if(this.text != ''){
          var _this = this
          _this.onscroll = false;
          $('.search_list').empty();
          this.$axios
            .get(
              _this.$store.state.dataUrl+"api/cinemasList?&limit=" +
                10 +
                "&page=" +
                0 +
                "&text=" +
                _this.text
            )
            .then(result => {
              this.lists = result.data.data;
            })
        }else{
            this.onscroll = true;
            $('.search_list').empty();
            this.lists = null;
            this.selectAll(5, 0, true);
        }
      }
  },
   created() {
     this.selectAll(5, 0, true); //true代表第一次加载
     if(this.$route.path=='/cinema'){ //因Detail.vue中引入了cinema组件
       this.$store.state.showbottomNav = true;//显示底部导航
     }
   },
};
</script>


<style lang="scss" scoped>
header {
  background-color: #e56d57;
}
.city_list {
  line-height: 46px;
  text-align: center;
  font-size: 16px;

  .icon {
    display: inline-block;
    border-top: 5px solid black;
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    margin: 0px 5px;
  }
}

.search_text {
  background-color: #fff;
  position: relative;
  height: 30px;
  line-height: 46px;

  .search_text_input {
    margin:0;
    border:1px solid #ccc;
    outline: none;
    height: 30px;
    padding: 0px;
    font-size: 16px;
  }
  .mintui-search {
    position: absolute;
    top: 3px;
    right: 5px;
    color:#ccc;
  }
}
// 列表
.mui-table-view .mui-media-object {
  height: 60px;
}
.cinemaname{
  font-size: 16px;
  color:black;
}
.youhui{
  overflow: hidden;
  span.icon_youhui{
    display: block;
    float: left;
    width:40px;
    height:20px;
    font-size:6px;
    margin-left: 3px;
    text-align: center;
    line-height: 20px;
  }
  span.icon_youhui1{
    border: 1px solid yellow;
    color: yellow;
  }
 span.icon_youhui2{
    border: 1px solid green;
    color: green;
  }
  span.icon_youhui3{
  border: 1px solid red;
  color: red;
}
}
</style>
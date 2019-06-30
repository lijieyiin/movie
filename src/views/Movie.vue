<template>
  <div class="movie">
    <mt-header fixed title="电影"></mt-header>
    <div class="mui-content">
      <div class="mui-row">
        <mt-navbar v-model="selected">
          <div class="mui-col-sm-3 mui-col-xs-3">
            <div class="city_list">
              <span class="city">广州</span>
              <span class="icon"></span>
            </div>
          </div>
          <div class="mui-col-sm-3 mui-col-xs-3">
            <mt-tab-item id="1">正在上映</mt-tab-item>
          </div>
          <div class="mui-col-sm-3 mui-col-xs-3">
            <mt-tab-item id="2">即将上映</mt-tab-item>
          </div>
          <div class="mui-col-sm-3 mui-col-xs-3 search_my">
            <mt-tab-item id="3">
              <i class="mintui mintui-search"></i>
            </mt-tab-item>
          </div>
        </mt-navbar>
        
        <!-- 轮播图 -->
          <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <van-image
              width="100%"
              height="120"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561637135231&di=06806a4f71e724bdf6583d04f9690246&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F337%2F32445.jpg"
            />
          </van-swipe-item>
          <van-swipe-item>
            <van-image
              width="100%"
              height="120"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561636961055&di=bc117d79b95026804e605f338d0094a1&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171210%2F766d14c7f3e94fe7b96d690dd243076f.jpeg"
            />
          </van-swipe-item>
          <van-swipe-item>
            <van-image
              width="100%"
              height="120"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561637792250&di=7252b2f8cbbc015e114e13042d9152cb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb549e9c5eeb919ba0c98e81ffed6fb0310fa3da6172f6e-l9rORc_fw658"
            />
          </van-swipe-item>
        </van-swipe>
        <!-- 轮播图end -->

        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <!-- 正在热映电影列表 -->
            <div class="movieList">
              <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="(item,i) in lists" :key="i">
                  <router-link
                    tag="a"
                    :to="{ path: '/detail?index=1', query: { movieId: item.movieId }}"
                  >
                    <img class="mui-media-object mui-pull-left" :src="item.img">
                    <!-- <button type="button" class="mui-btn mui-btn-danger mui-pull-right">购票</button> -->
                    <div class="mui-media-body">
                      {{item.title}}
                      <br>
                      <span>刺猬评分：{{item.score=='暂无评分'?item.score:item.score+'分'}}</span>
                      <p class="mui-ellipsis">{{item.content}}</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- end -->
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <!-- 即将上映电影列表1205775 -->
            <div class="movieComeList">
              <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="(item,i) in comelists" :key="i">
                  <router-link
                    tag="a"
                    :to="{ path: '/detail?index=2', query: { movieId: item.movieId}}"
                  >
                    <img class="mui-media-object mui-pull-left" :src="item.img">
                    <!-- <button type="button" class="mui-btn mui-btn-danger mui-pull-right">购票</button> -->
                    <div class="mui-media-body">
                      {{item.title}}
                      <br>
                      <span>想看人数：{{item.score==undefined?"暂无":item.score}}</span>
                      <p class="mui-ellipsis">上映时间：{{item.date}}</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- end -->
          </mt-tab-container-item>

          <mt-tab-container-item id="3">
            <!-- 搜索 -->
            <div class="search_text">
              <input type="text" class="search_text_input" v-model="text" placeholder="搜索...">
              <i class="mintui mintui-search" @click="change_search"></i>
            </div>
            <ul class="mui-table-view search_list">
              <li class="mui-table-view-cell mui-media" v-for="(item,i) in searchLists" :key="i">
                <router-link tag="a" :to="{ path: !item.isCome?'/detail?index=1':'/detail?index=2', query: { movieId: item.movieId}}">
                  <img class="mui-media-object mui-pull-left" :src="item.img">
                  <!-- <button v-if="!item.isCome" type="button" class="mui-btn mui-btn-success mui-pull-right">购票1</button> -->
                  <!-- <button v-if="item.isCome" type="button" class="mui-btn mui-btn-danger mui-pull-right">预定2</button> -->
                  <div class="mui-media-body">
                    {{item.title}}
                    <br>
                    <span v-if="!item.isCome">刺猬评分：{{item.score=='暂无评分'?item.score:item.score+'分'}}</span>
                    <span v-if="item.isCome">想看人数：{{item.score==undefined?"暂无":item.score}}</span>
                    <p v-if="!item.isCome" class="mui-ellipsis">{{item.content}}</p>
                    <p v-if="item.isCome" class="mui-ellipsis">上映时间：{{item.date}}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
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
      if (scrollT == scrollH - clientH) {
        //滚动条到底部
        if ($(".is-selected .mint-tab-item-label").text() == "正在上映电影") {
          if (_this.loadBool) {
            //保证请求完数据后，再次滚动才有效
            _this.loadBool = false;
            _this.selectAll(5, _this.page + 1, false);
          }
        } else if (
          $(".is-selected .mint-tab-item-label").text() == "即将上映电影"
        ) {
          if (_this.loadBool) {
            //保证请求完数据后，再次滚动才有效
            _this.loadBool = false;
            _this.selectComeAll(5, _this.page1 + 1, false);
          }
        }
      }
    };

    return {
      selected: "true",
      limit: 5, //每页数量
      page: 0, //第几页 //正在热映
      page1: 0, //第几页 即将上映
      lists: null,
      comelists: null,
      searchLists: [],
      text: "",
      loadBool: true
    };
  },
  created() {
    this.selectAll(5, 0, true); //true代表第一次加载
    this.selectComeAll(5, 0, true); //true代表第一次加载
    this.$store.state.showbottomNav = true; //显示底部导航
  },
  methods: {
    selectAll(limit, page, index) {
      //请求数据
      this.$axios
        .get(
          this.$store.state.dataUrl +
            "api/moviesList?&limit=" +
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
            result.data.data.forEach(element => {
              this.lists.push(element);
            });
          }
          this.limit = limit;
          this.page = page;
          $("a:first")[0].click(); //模拟点击事件需要使用原生DOM元素调用click()方法
          this.loadBool = true; //保证加载完数据后再次滚动才有效
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //即将上映
    selectComeAll(limit, page1, index) {
      //请求数据
      this.$axios
        .get(
          this.$store.state.dataUrl +
            "api/moviesComeList?&limit=" +
            5 +
            "&page=" +
            page1 +
            "&text=" +
            ""
        )
        .then(result => {
          if (index) {
            //首次加载
            this.comelists = result.data.data;
          } else {
            result.data.data.forEach(element => {
              this.comelists.push(element);
            });
          }
          this.page1 = page1;
          this.loadBool = true; //保证加载完数据后再次滚动才有效
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //搜索即将上映信息
    getSearchList1(dpath) {
      return new Promise((resolve, reject) => {
        this.$axios.get(dpath).then(result => {
          resolve(result.data.data);
        });
      });
    },
    //搜索正在上映信息
    getSearchList2(dpath) {
      return new Promise((resolve, reject) => {
        this.$axios.get(dpath).then(result => {
          resolve(result.data.data);
        });
      });
    },
    //搜索
    change_search() {
      var _this = this;
      $(".search_list").empty();
      if (_this.text != "") {
        _this
          .getSearchList1(
            _this.$store.state.dataUrl +
              "api/moviesComeList?limit=" +
              5 +
              "&page=" +
              0 +
              "&text=" +
              _this.text
          )
          .then(function(data) {
            data.forEach(element => {
              _this.searchLists.push(element);
            });
            return _this.getSearchList2(
              _this.$store.state.dataUrl +
                "api/moviesList?limit=" +
                5 +
                "&page=" +
                0 +
                "&text=" +
                _this.text
            );
          })
          .then(function(data) {
            if(data!=null){
              data.forEach(element => {
              _this.searchLists.push(element);
            });
            }
          });
      } else {
        $(".search_list").empty();
      }
    }
  }
};
</script>  

<style lang="scss" scoped>

.movie {
  padding-bottom: 55px;
}
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
  height: 40px;
  border-radius: 5px;
  .search_text_input {
    outline: none;
    padding-left: 20px;
  }
  .mintui-search {
    position: absolute;
    top: 10px;
    right: 5px;
  }
}

//解决轮播过程中导致下一个div内容发生抖动

//电影列表
.mui-media-body {
  width: auto;
  font-size: 14px;
  span {
    font-size: 10px;
    color: #e56d57;
  }
  p {
    font-size: 10px;
  }
}
.mui-table-view .mui-media-object {
  line-height: 42px;
  max-width: 42px;
  height: 60px;
}
.mint-tab-item {
  color: black;
}
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 5px solid #e56d57;
  color: #e56d57;
  margin-bottom: -3px;
}
</style>


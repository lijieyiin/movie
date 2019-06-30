<template>
    <div>
        <header class="mint-header is-fixed">
        <div class="mint-header-button is-left">
          <a href="javascript:;" class="page-back router-link-active">
            <i class="mintui mintui-back" @click.stop="$router.back(-1)"></i>
          </a>
        </div>
        <h1 class="mint-header-title">我的收藏</h1>
        <div class="mint-header-button is-right"></div>
      </header>
        <!-- 收藏列表 -->
            <div class="movieList">
              <ul id="OA_task_1" class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="(item,i) in collectList" :key="i">
                   <div class="mui-slider-right mui-disabled">
                        <a class="mui-btn mui-btn-red" @click="delCollect(item.movieId)">删除</a>
                    </div>
                    <div class="mui-slider-handle">
                  <router-link
                    tag="a"
                    :to="{ path: item.score>10?'/detail?index=2':'/detail?index=1', query: { movieId: item.movieId }}"
                  >
                    <img class="mui-media-object mui-pull-left" :src="item.img">
                    <div class="mui-media-body">
                      {{item.title}}
                      <br>
                      <span>{{item.score>10?item.score+"人想看":item.score+'分'}}</span>
                      <p class="mui-ellipsis">{{item.content}}</p>
                    </div>
                  </router-link>
                   </div>
                </li>
              </ul>
            </div>
            <!-- end -->
    </div>
</template>
<script>
import mui from "../assets/mui/js/mui.js";
export default {
    data(){
        return{
            collectList:null,
        }
    },
    created(){
        this.collectList = JSON.parse(localStorage.collectList);
        this.$store.state.showbottomNav = false;//不显示底部导航栏
    },
    mounted() {
        // 关于如何在vue-cli3.0中引入mui.js和相关扩展
        // http://ask.dcloud.net.cn/article/13509
        mui.init();
    },
    methods: {
        delCollect(movieId){
            var array = JSON.parse(localStorage.collectList);
            array.forEach((element,i) => {
                if(element.movieId == movieId){
                    array.splice(i,1);
                }
            })
            this.collectList = array
            localStorage.setItem('collectList',JSON.stringify(array))

        }
    },
}
</script>
<style lang="scss" scoped>
//头部head
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
//=====
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
</style>

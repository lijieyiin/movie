<template>
    <div>
        <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item,i) in swiperlistchild"
          :key="i"
          :data-index="i" 
        >
          <img :src="item" alt>
          <!-- {{item}} -->
        </div>
          <!-- <div style="" :count=count>{{count}}</div> -->
      </div>
    </div>
    </div>
</template>
<script>
import $ from "jquery/dist/jquery.js";
import Swiper from "swiper";
export default {
    props:['swiperlistchild','index'],
    mounted() {
    var _this = this;

    new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: true,
      observer:true,
      on: {
        //点击某张电影海报，更改相应的信息
        slideChangeTransitionEnd: function(event) {
          var index = $(".swiper-slide-active")[0].getAttribute("data-index");
         _this.$emit('childIndex',index)
        //  console.log(index)
        //  _this.movieId = _this.list.movieId[index];
        //   _this.movieName = _this.list.movieName[index];
        //   _this.movieScore = _this.list.movieScore[index];
        //   _this.movieActor = _this.list.movieActor[index];
        //   _this.movieTime = _this.list.movieTime[index];
        //   _this.movieType = _this.list.movieType[index];
        //   _this.movieIndex = index;
        }
      }
    });
    }
}
</script>
<style lang="scss" scoped>
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

</style>
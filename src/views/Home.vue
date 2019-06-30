<template>
  <div>
    

  <!-- Swiper -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../assets/img/yd01.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/img/yd02.jpg" alt="">
      </div>
      <div class="swiper-slide btn_div">
        <img src="../assets/img/yd03.jpg" alt="">
         <van-button type="warning" plain  class="btn" to="/movie">点击体验</van-button>
      </div>
    </div>
    
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>

  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  created() {
    this.$store.state.showbottomNav = false;
    if(!localStorage.one){
      localStorage.one = true
    }else{
      this.$router.push('/adv')
    }
  },
  mounted(){
      new Swiper('.swiper-container',{
        pagination: {
          el: '.swiper-pagination',
        },
      });
    }
}
</script>
<style lang="scss" scoped>
    .swiper-container {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      img{
        width: 100%;
        height: 100%;
      }
      h3{
        color:#808080;
      }
    }

    .btn_div{
      position: relative;
      .btn{
      position: absolute;
      top:46%;
      left:65%;
      z-index: 10000;
    }
    }
    
</style>

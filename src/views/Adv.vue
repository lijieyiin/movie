<template>
  <div>
  <!-- Swiper -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../assets/img/adv.png" alt="">
        <p class="adv">广告{{num}}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
    data(){
        return{
            num:3,
            timer:null,
        }
    },
    created() {
        this.$store.state.showbottomNav = false;
        var _this = this
        this.timer = setInterval(function(){
            if(_this.num != 0){
                _this.num--
            }else{
              if(sessionStorage.token!=null){
                _this.$router.push("/movie")
              }else{
                _this.$router.push("/login")
              }
            }
        },1000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
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
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      h3{
        color:#808080;
      }
      p{
          position:absolute;
          z-index:1000;
          top:5px;
          right: 5px;
          padding: 3px;
          border-radius: 5px;
          background-color: rgba(0,0,0, .6)
      }
    }

    
</style>

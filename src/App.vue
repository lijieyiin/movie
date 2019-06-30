<template>
    <div>
      <navbottom></navbottom>
    </div>
</template>

<script>
import navbottom from './components/navbottom.vue'
export default {
  data(){
    return {

    }
  },
    components:{
    navbottom,
  },
}
</script>
<style lang="scss" scoped>

.app-container {
  margin-top:40px;
  // padding-bottom: 55px;
  overflow: hidden;
}
header{
  background-color: #E56D57;
}
a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  &.router-link-exact-active {
    color: #E56D57;
  }
}
.mint-tab-item-icon .iconfont {
  font-size: 20px;
}
.mint-tabbar > .mint-tab-item.is-selected{
  color: #E56D57;
}
.v-enter,
.v-leave-to{
  opacity: 0;
  transform: translateX(100%)
}
.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}

</style>

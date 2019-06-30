<template>
  <div class="app-container" id="app-container">
    <!-- 内容区域 -->
    <transition mode="out-in">
    <router-view/>
    </transition>
    <!-- 内容区域 end-->

    <!-- 底部导航 -->
    <nav class="mint-tabbar is-fixed" v-if="this.$store.state.showbottomNav">
      <router-link to="/movie" class="mint-tab-item" >
        <div class="mint-tab-item-icon">
          <span class="iconfont icon-dianying"></span>
        </div>
        <div class="mint-tab-item-label">电影</div>
      </router-link>
      <router-link to="/cinema" class="mint-tab-item">
        <div class="mint-tab-item-icon">
          <span class="iconfont icon-yingyuana"></span>
        </div>
        <div class="mint-tab-item-label">影院</div>
      </router-link>
      <router-link to="/order" class="mint-tab-item">
        <div class="mint-tab-item-icon">
          <span class="iconfont icon-dingdan"></span>
        </div>
        <div class="mint-tab-item-label">订单</div>
      </router-link>
      <router-link to="/my" class="mint-tab-item">
        <div class="mint-tab-item-icon">
          <span class="iconfont icon-wode"></span>
        </div>
        <div class="mint-tab-item-label">我的</div>
      </router-link>
    </nav>
    
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  margin-top:40px;
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

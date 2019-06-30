import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () =>
      import("./views/Home.vue")
    },
    {//广告
      path:"/adv",
      name:"adv",
      component: () =>
      import("./views/Adv.vue")
    },
    {//登录
      path:"/login",
      name:"login",
      component: () =>
      import("./views/Login.vue")
    },
    {//电影
      path: "/movie",
      name:"movie",
      component: () =>
      import("./views/Movie.vue"),
      meta: {
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    },
    {//影院
      path: "/cinema",
      component: () =>
        import("./views/Cinema.vue"),
        meta: {
          type: 'login'  // 是否需要判断是否登录,这里是需要判断
        }
    },
    {//影院信息里面的轮播图
      path: "/swiper",
      name:"swiper",
      component: () =>
      import("./components/swiper.vue"),
      meta: {
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    },
    {//我的收藏
      path: "/collect",
      component: () =>
        import("./views/Collect.vue"),
        meta: {
          type: 'login'  // 是否需要判断是否登录,这里是需要判断
        }
    },
    {//订单
      path: "/order",
      component: () =>
        import("./views/Order.vue"),
        meta: {
          type: 'login'  // 是否需要判断是否登录,这里是需要判断
        }
    },
    {//我的
      path: "/my",
      component: () =>
        import("./views/My.vue"),
        meta: {
          type: 'login'  // 是否需要判断是否登录,这里是需要判断
        }
    },
    {//详情
      path: "/detail",
      name:"detail",
      component: () =>
      import("./views/Detail.vue"),
      meta: {
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    }, 
    {//电影详情
      path: "/movieDetail",
      name:"moviedetail",
      component: () =>
      import("./views/MovieDetail.vue"),
      meta: {
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    },
    {//电影院详情
      path: "/cinemadateil",
      name:"cinemadateil",
      component: () =>
      import("./views/CinemaDetail.vue"),
      meta: {
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    },
    {//选择座位
      path: "/ticket",
      name:"ticket",
      component: () =>
      import("./views/Ticket.vue"),
      meta: {
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    },
    {//结算
      path:"/buyTicket",
      name:"buyTicket",
      component: () =>
      import("./views/BuyTicket.vue"),
      meta: {
        type: 'login'  // 是否需要判断是否登录,这里是需要判断
      }
    }
  ],
  
  linkActiveClass: "is-selected" //
});

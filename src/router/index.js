import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const rouer = new Router({
    mode: "history", // 没有 #
    routes: [{
            path: "/",
            component: () =>
                import ("@/components/layout"),
            children: [{
                path: "",
                component: () =>
                    import ("@/views/auth/login")
            }]
        },
        {
            path: "/refresh",
            component: () =>
                import ("@/components/layout"),
            children: [{
                path: "",
                component: () =>
                    import ("@/views/auth/refresh")
            }]
        }
    ]
});

// 每次路由跳转都会执行
rouer.beforeEach((to, from, next) => {
    if (to.path === "/logout") {
        // 退出登录
        store.dispatch("UserLogout", to.query.redirectURL);
    } else {
        next();
    }
});

export default rouer;
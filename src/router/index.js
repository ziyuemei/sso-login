import Vue from "vue";
import Router from "vue-router";

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
    }]
});

export default rouer;
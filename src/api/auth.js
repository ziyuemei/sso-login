import request from "@/utils/request";

const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
};

// 在请求头添加一条属性： Authrization: Basic client_id:client_secret
const auth = {
    username: "blog-admin",
    password: "123456789"
};

export function login(data) {
    return request({
        headers,
        auth,
        url: `/auth/login`,
        method: "post",
        params: data
    });
}

// 查询用户名是否已被注册
export function getUserByUsername(username) {
    return request({
        url: `/auth/username/${username}`,
        method: "get"
    });
}

// 提交注册数据
export function register(data) {
    return request({
        headers,
        auth,
        url: `/auth/register`,
        method: "post",
        params: data
    });
}

// 退出登录
export function logout(accessToken) {
    return request({
        url: "/auth/logout",
        method: "get",
        params: {
            accessToken
        }
    });
}

//刷新令牌
export function refreshToken(refreshToken) {
    return request({
        headers,
        auth,
        url: "/auth/refresh",
        method: "get",
        params: {
            refreshToken
        }
    });
}

// 获取协议内容
export function getXieyi() {
    return request({
        url: `${window.location.href}/xieyi.html`,
        method: "get"
    });
}
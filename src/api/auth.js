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
import { login, logout } from "@/api/auth";
import { PcCookie, Key } from "@/utils/cookie";

const state = {
    userInfo: PcCookie.get(Key.userInfoKey) ?
        JSON.parse(PcCookie.get(Key.userInfoKey)) :
        null,
    accessToken: PcCookie.get(Key.accessTokenKey),
    refreshToken: PcCookie.get(Key.refreshTokenKey)
};

// 改变状态值
const mutations = {
    // 赋值用户状态
    SET_USER_STATE(state, data) {
        const { userInfo, access_token, refresh_token } = data;
        state.userInfo = userInfo;
        state.accessToken = access_token;
        state.refreshToken = refresh_token;
        PcCookie.set(Key.userInfoKey, userInfo);
        PcCookie.set(Key.accessTokenKey, access_token);
        PcCookie.set(Key.refreshTokenKey, refresh_token);
    },
    // 重置用户状态
    RESET_USER_STATE(state) {
        state.userInfo = null;
        state.accessToken = null;
        state.refreshToken = null;
        PcCookie.remove(Key.userInfoKey);
        PcCookie.remove(Key.accessTokenKey);
        PcCookie.remove(Key.refreshTokenKey);
    }
};

// 定义行为
const actions = {
    UserLogin({ commit }, userData) {
        const { username, password } = userData;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password })
                .then(res => {
                    console.log(res, "哈哈");
                    const { code, data } = res;
                    if (code === 200) {
                        // 状态赋值
                        commit("SET_USER_STATE", data);
                    }
                    // 正常响应
                    resolve(res);
                })
                .catch(err => {
                    // 重置状态
                    commit("RESET_USER_STATE");
                    // 请求异常
                    reject(err);
                });
        });
    },
    UserLogout({ state, commit }, redirectURL) {
        logout(state.accessToken)
            .then(res => {
                if (res.code === 200) {
                    commit("RESET_USER_STATE");
                    window.location.href = redirectURL || "/";
                }
            })
            .catch(err => {
                commit("RESET_USER_STATE");
                window.location.href = redirectURL || "/";
            });
    }
};

export default {
    state,
    mutations,
    actions
};
import { login } from "@/api/auth";
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
        PcCookie.set(Key.accessToken, access_token);
        PcCookie.set(Key.refreshToken, refresh_token);
    },
    // 重置用户状态
    RESET_USER_STATE(state) {
        state.userInfo = null;
        state.accessToken = null;
        state.refreshToken = null;
        PcCookie.remove(Key.userInfoKey);
        PcCookie.remove(Key.accessToken);
        PcCookie.remove(Key.refreshToken);
    }
};

// 定义行为
const actions = {
    UserLogin({ commit }, userData) {
        const { username, password } = userData;
        login({ username: username.trim(), password })
            .then(res => {
                console.log("登录信息", res);
                const { code, data } = res;
                if (code === 200) {
                    // 状态赋值
                    commit("SET_USER_STATE", data);
                }
            })
            .catch(err => {
                // 重置状态
                commit("RESET_USER_STATE");
            });
    }
};

export default {
    state,
    mutations,
    actions
};
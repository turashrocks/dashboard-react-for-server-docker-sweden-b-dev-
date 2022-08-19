/**
 * @description 用户模块action
 * @author turash 1217437592@qq.com
 */

// 引入action_type变量
import { Notification, Message } from '@arco-design/web-react';
import {
  GET_USERINFO,
  SET_USERINFO,
  LOGIN,
  SET_PERMISSIONS,
  LOGOUT,
  SET_ACCESS_TOKEN
} from '@/store/action_types';

import { login, getUserInfo } from '@/api/user';
import { setRoutersHandler } from './router';

import { setting } from '@/config/setting';

import store from '../index';

const { title, tokenName } = setting;

/**
 * @description 设置token
 * @param {string} payload
 * @returns
 */
export const setAccessTokenHandler = (payload) => async (dispatch) => {
  dispatch({
    type: SET_ACCESS_TOKEN,
    payload
  });
};

/**
 * @description 设置权限
 * @param {Array} payload
 * @param {function} call 回调Hanns胡
 * @returns
 */
export const setPermission = (payload, call) => async (dispatch) => {
  dispatch({
    type: SET_PERMISSIONS,
    payload,
    call
  });
};

const getTimeStr = () => {
  const hour = new Date().getHours();
  if (hour < 6) return 'Good Morning';
  if (hour < 9) return 'Good Morning';
  if (hour < 12) return 'Good Morning';
  if (hour < 14) return 'Good Afternoon';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 19) return 'Good Evening';
  if (hour < 22) return 'Greetings';
  return 'Greetings';
};

/**
 * @description 登录
 * @param {Object} payload 用户信息
 * @returns
 */
export const loginHandler = (payload) => async (dispatch) => {
  const { data } = await login(payload);
  const accessToken = data[tokenName];
  if (accessToken) {
    await dispatch(setAccessTokenHandler({ accessToken }));
    await dispatch(setRoutersHandler());
    const thisTime = getTimeStr();

    Notification.success({
      title: `${thisTime}！`,
      content: `Welcome to ${title}!`
    });
  } else Message.error(`Login Crdentials are incorrect${tokenName}...`);
  dispatch({
    type: LOGIN,
    payload: data.accessToken
  });
};

/**
 * @description 退出登录
 * @returns
 */
export const logout = () => async (dispatch) => {
  dispatch(setPermission([]));
  dispatch(
    setAccessTokenHandler({
      accessToken: ''
    })
  );
  dispatch({
    type: LOGOUT,
    payload: ''
  });
};

/**
 * @description 获取用户信息
 * @param {function} call
 * @returns
 */
export const getUserInfoHandler = (call) => async (dispatch) => {
  const { accessToken } = store.getState().userReducer;
  const { data } = await getUserInfo(accessToken);
  if (!data) {
    return Message.error('验证失败，请重新登录...');
  }
  const { permissions, username } = data;
  if (permissions && username && Array.isArray(permissions)) {
    dispatch({
      type: GET_USERINFO,
      payload: data,
      call
    });
  } else {
    return Message.error('用户信息接口异常');
  }
};

// 设置用户信息action
export const setUserInfo = (data) => ({
  type: SET_USERINFO,
  data
});

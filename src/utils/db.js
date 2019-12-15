import { axios, DEV, _commonData, mock } from './axios';
import * as user from './user';
import { sport as setting } from './setting';

/**
*   @database: { 微信开发 }
*   @desc:     { 用户登录信息查询 } 
    const { card_no, user_name } = params;
*/
export const getViewCbpcUserList = params =>
  axios({
    url: '/41/bdcb547de9.json',
    params,
  });

/**
*   @database: { 微信开发 }
*   @desc:     { 记录调查地址 } 
    const { uid, q_0, q_1, q_2, q_3, q_4, q_5, q_6, q_7, q_8, q_9, q_10, q_11, q_12, q_13, q_14, q_15, q_16, q_17, q_18, q_19, q_20, q_21, q_22, q_23, q_24, q_25, q_26, q_27, q_28, q_29, q_30, q_31, q_32, q_33, q_34, q_35, q_36, q_37, q_38, rec_time } = params;
*/
export const addCbpcVote201910 = params =>
  axios({
    url: '/212/40cbfdf2a7.json',
    params,
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 问卷列表 }
 */
export const getCbpcHarmoney2019 = (company_id = setting.company_id) =>
  axios({
    url: '/169/77b0183631/0.json',
    params: {
      company_id,
    },
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 团委员工归属感调查问卷结果 }
 */
export const getCbpcVote201910 = () =>
  axios({
    url: '/215/7da79abfc5.json',
  }).then(res => res.data.map(item => Object.values(item)));

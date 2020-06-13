import { axios, _commonData } from './axios';
import * as R from 'ramda';
/**
*   @database: { 微信开发 }
*   @desc:     { 团委-签到 } 
    const { user, timestamp, rec_time } = params;
*/
export const addCbpcyouth2019Checkin = params =>
  axios({
    url: '/216/0d27b05155.json',
    params,
  });
/**
 *   @database: { 微信开发 }
 *   @desc:     { 团委-签到总人数 }
 */
export const getCbpcyouth2019Checkin = () =>
  axios({
    url: '/217/d23723aedc.json',
  }).then(res => res.data[0].num);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 战队列表 }
 */
export const getCbpcyouth2019Votelist = () =>
  axios({
    url: '/218/72c0b1638e.array',
  });
/**
*   @database: { 微信开发 }
*   @desc:     { 战队投票 } 
    const { vote, user } = params;
*/
export const setCbpcyouth2019Checkin = params =>
  axios({
    url: '/219/f0673d15f4.json',
    params,
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 观众投票情况 }
 */
export const getCbpcyouth2019CheckinVotes = () =>
  axios({
    url: '/220/a93dec6422.json',
  });

/**
*   @database: { 微信开发 }
*   @desc:     { 更新评委打分 } 
    const { score_0, score_1, score_2, score_3, score_4, score_5 } = params;
*/
export const setCbpcyouth2019Votelist = params =>
  axios({
    url: '/221/c35b24cae1.json',
    params,
  });
/**
 *   @database: { 微信开发 }
 *   @desc:     { 今日参与人员情况 }
 */
export const getCbpcSport2020 = () =>
  axios({
    url: '/305/659c64cd6f.array',
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 各部门平均得分 }
 */
export const getCbpcSport2020Score = sid =>
  axios({
    url: '/306/3e258eaab9.json',
    params: {
      sid,
    },
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 不同场次交卷情况及得分汇总 }
 */
export const getCbpcSport2020Summary = sid =>
  axios({
    url: '/307/9772686879.array',
    params: { sid },
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 部门通过率排名 }
 */
export const getCbpcSport2020Passrate = sid =>
  axios({
    url: '/309/e3dcf29f4b.json',
    params: {
      sid,
    },
  });
/**
 *   @database: { 微信开发 }
 *   @desc:     { 未答题人员名单 }
 */
export const getCbpcSport2020Uncomplete = sid =>
  axios({
    url: '/310/de06f2076e.array',
    params: {
      sid,
    },
  });
/**
 *   @database: { 微信开发 }
 *   @desc:     { 部门列表 }
 */
export const getCbpcDeptList = (sid = 36) =>
  axios({
    url: '/273/49aff5c500/array.json',
    params: {
      sid,
      cache: 7200,
    },
  }).then(res => R.flatten(res.data));

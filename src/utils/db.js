import { axios, _commonData } from './axios';

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

import React, { useState, useEffect } from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.less';

import QRCode from 'qrcode.react';

import moment from 'moment';
import md5 from 'md5';
import { useInterval } from 'react-use';

export const timestamp = () => moment().format('x');

export const getUrl = () => {
  let { host, protocol, pathname } = window.location;
  let salt = 'cbpc';

  let ts = timestamp();
  let token = md5(salt + ts)
    .slice(10, 16)
    .split('')
    .reverse()
    .join('');
  return `${protocol}//${host}/${pathname}#paper?timestamp=${ts}&t=${token}`;
};

export default function NewPage() {
  // 扫码登录相关逻辑 start

  // 扫码登录相关逻辑 start
  const [qrcode, setQrcode] = useState<string>('');
  const [num, setNum] = useState(0);
  const refreshUrl = async () => {
    let url = await getUrl();
    console.log('cur Url', url);
    setQrcode(url);
  };
  useEffect(() => {
    refreshUrl();
  }, []);

  useInterval(refreshUrl, 5 * 1000);

  return (
    <div className={styles.content}>
      <WingBlank>
        <h2>“牢记青春使命”微团课比赛</h2>
        <div className={styles.qr}>
          <QRCode size={400} value={qrcode} />
          <a href={qrcode}>{qrcode}</a>
        </div>
        <div>
          {/* <a href="#">签到</a> */}
          {/* <a href="#uservote" style={{ marginLeft: 20, marginRight: 20 }}>
            用户投票二维码
          </a> */}
          <a href="#chart">用户投票结果</a>
        </div>
      </WingBlank>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.less';
import { useInterval } from 'react-use';
import QRCode from 'qrcode.react';
import moment from 'moment';
import * as db from '@/utils/db';
import md5 from 'md5';

export const timestamp = () => moment().format('x');

export const getUrl = () => {
  // let { host, protocol, pathname } = window.location;
  let salt = 'cbpc';

  let ts = timestamp();
  let token = md5(salt + ts)
    .slice(10, 16)
    .split('')
    .reverse()
    .join('');
  return `http://www.cbpc.ltd/public/topic/20200420/?timestamp=${ts}&t=${token}`;
};

export default function NewPage() {
  // 扫码登录相关逻辑 start
  const [qrcode, setQrcode] = useState<string>('');
  const refreshUrl = async () => {
    let url = getUrl();
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
        <h2>2020年全员安全履职能力闭卷测试</h2>
        <div className={styles.qr}>
          <QRCode size={400} value={qrcode} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href="#chart">数据导出</a>
        </div>
      </WingBlank>
    </div>
  );
}

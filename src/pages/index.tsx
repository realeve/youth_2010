import React, { useState, useEffect } from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.less';
import { useInterval } from 'react-use';
import QRCode from 'qrcode.react';
import moment from 'moment';

export const timestamp = () => moment().format('x');

export const getUrl = async () => {
  let { host, protocol } = window.location;
  return `${protocol}//${host}/#checkin?timestamp=${timestamp()}`;
};

export default function NewPage() {
  // 扫码登录相关逻辑 start
  const [qrcode, setQrcode] = useState<string>('');
  const refreshUrl = async () => {
    let url = await getUrl();
    console.log('cur Url', url);
    setQrcode(url);
  };
  useEffect(() => {
    refreshUrl();
  }, []);

  useInterval(refreshUrl, 10 * 1000);

  return (
    <div className={styles.content}>
      <WingBlank>
        <h2>
          1.现场扫码签到<small>(已签到128人)</small>
        </h2>
        <a href={qrcode}>{qrcode}</a>
        <div className={styles.qr}>
          <QRCode size={800} value={qrcode} />
        </div>
      </WingBlank>
    </div>
  );
}

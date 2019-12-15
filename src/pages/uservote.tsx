import React, { useState, useEffect } from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.less';

import QRCode from 'qrcode.react';

export const getUrl = async () => {
  let { host, protocol } = window.location;
  return `${protocol}//${host}/#paper`;
};

export default function NewPage() {
  // 扫码登录相关逻辑 start
  const qrcode = getUrl();

  return (
    <div className={styles.content}>
      <WingBlank>
        <h2>2.用户投票</h2>
        <div className={styles.qr}>
          <QRCode size={600} value={qrcode} />
        </div>
        <div>
          <a href="#">签到</a>
          <a href="#uservote" style={{ marginLeft: 20, marginRight: 20 }}>
            用户投票二维码
          </a>
          <a href="#chart">用户投票结果</a>
        </div>
      </WingBlank>
    </div>
  );
}

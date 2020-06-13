import React, { useState, useEffect } from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.less';
import { useInterval } from 'react-use';
import QRCode from 'qrcode.react';
import moment from 'moment';
import * as db from '@/utils/db.js';
// import md5 from 'md5';

export const timestamp = () => moment().format('x');

export const getUrl = idx => {
  // let { host, protocol, pathname } = window.location;
  // let salt = 'cbpc';

  // let ts = timestamp();
  // let token = md5(salt + ts)
  //   .slice(10, 16)
  //   .split('')
  //   .reverse()
  //   .join('');

  // 0616 非党员
  // 0615 党员
  return [
    `http://www.cbpc.ltd/public/topic/20200615/?dept=${idx}`,
    `http://www.cbpc.ltd/public/topic/20200616/?dept=${idx}`,
  ];
};

export default function NewPage() {
  // 扫码登录相关逻辑 start
  const [qrcode, setQrcode] = useState<string[][]>([['', '']]);
  const [depts, setDepts] = useState([]);
  const refreshUrl = async deptList => {
    setQrcode(deptList.map((item, idx) => getUrl(idx)));
  };
  useEffect(() => {
    db.getCbpcDeptList().then(res => {
      setDepts(res);
      refreshUrl(res);
    });
  }, []);

  useInterval(() => {
    refreshUrl(depts);
  }, 5 * 1000);

  return (
    <div className={styles.content}>
      {qrcode.map((item, idx) => (
        <div style={{ display: 'flex', flexDirection: 'row' }} key={item[0]}>
          <WingBlank className={styles.wrap}>
            <h2>
              “学规章、守纪律，严管理、促养成”
              <br />
              专题教育考试
            </h2>
            <div className={styles.qr}>
              <QRCode size={250} value={item[0]} />
            </div>
            <h2 className={styles.title}>{depts[idx]} 【党员登录】</h2>
          </WingBlank>
          <WingBlank className={styles.wrap} key={item}>
            <h2>
              “学规章、守纪律，严管理、促养成”
              <br />
              专题教育考试
            </h2>
            <div className={styles.qr}>
              <QRCode size={250} value={item[1]} />
            </div>
            <h2 className={styles.title}>{depts[idx]} 【非党员登录】</h2>
          </WingBlank>
        </div>
      ))}
      {/* <div style={{ textAlign: 'center' }}>
          <a href="#chart">数据导出</a>
        </div> */}
    </div>
  );
}

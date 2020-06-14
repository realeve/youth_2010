import React, { useState, useEffect } from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.less';
import { useInterval } from 'react-use';
import QRCode from 'qrcode.react';
import moment from 'moment';
import * as db from '@/utils/db.js';
import classnames from 'classnames';
// import md5 from 'md5';
import Dom2pic from 'dom2pic';

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
  if (idx == 0) {
    idx = '0,1,12,13,14,15';
  }

  // 0616 非党员
  // 0615 党员
  return [
    `http://www.cbpc.ltd/public/topic/20200615/?dept=${idx}`,
    `http://www.cbpc.ltd/public/topic/20200616/?dept=${idx}`,
  ];
};
// 下载Canvas元素的图片
const downloadCanvasIamge = (base64, name = '下载图片') => {
  // 生成一个a元素
  var a = document.createElement('a');
  // 创建一个单击事件
  var event = new MouseEvent('click');

  // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
  a.download = name;
  // 将生成的URL设置为a.href属性
  a.href = base64;

  // 触发a的单击事件
  a.dispatchEvent(event);
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
          <div
            onClick={() => {
              new Dom2pic({
                root: document.querySelector(`.img${idx}-0`),
                backgroundColor: '#fff',
              })
                .toPng()
                .then(base64 => {
                  downloadCanvasIamge(base64, depts[idx] + '【党员登录】');
                });
            }}
          >
            <WingBlank className={classnames(styles.wrap, `img${idx}-0`)}>
              <h2>
                “学规章、守纪律，严管理、促养成”
                <br />
                专题教育考试
              </h2>
              <div className={styles.qr}>
                <QRCode size={250} value={item[0]} />
              </div>
              <h2 className={styles.title}>
                {depts[idx]}
                <br />
                【党员登录】
              </h2>
            </WingBlank>
          </div>
          <div
            onClick={() => {
              new Dom2pic({
                root: document.querySelector(`.img${idx}-0`),
                backgroundColor: '#fff',
              })
                .toPng()
                .then(base64 => {
                  downloadCanvasIamge(base64, depts[idx] + '【非党员登录】');
                });
            }}
          >
            <WingBlank className={classnames(styles.wrap, `img${idx}-1`)}>
              <h2>
                “学规章、守纪律，严管理、促养成”
                <br />
                专题教育考试
              </h2>
              <div className={styles.qr}>
                <QRCode size={250} value={item[1]} />
              </div>
              <h2 className={styles.title}>
                {depts[idx]}
                <br />
                【非党员登录】
              </h2>
            </WingBlank>
          </div>
        </div>
      ))}
      {/* <div style={{ textAlign: 'center' }}>
          <a href="#chart">数据导出</a>
        </div> */}
    </div>
  );
}

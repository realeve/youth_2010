import React, { useState, useEffect } from 'react';
import { WhiteSpace, WingBlank, List } from 'antd-mobile';
import * as R from 'ramda';
import styles from './index.less';
import * as db from '@/utils/db.js';
import * as lib from '@/utils/lib';
const Item = List.Item;

export default function ScorePage() {
  return (
    <div className={styles.content}>
      <h3 style={{ textAlign: 'center' }}>员工归属感调查问卷数据汇总</h3>
      <WhiteSpace size="lg" />
      <WingBlank> 这里是得分的结果 </WingBlank>

      <WhiteSpace size="lg" />
    </div>
  );
}

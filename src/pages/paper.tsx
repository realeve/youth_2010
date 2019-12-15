import React, { useState, useEffect } from 'react';
import { Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import styles from './paper.less';
import { paperData } from '@/utils/questions';
import { connect } from 'dva';
import FormComponent from '@/components/FormComponent';
import router from 'umi/router';
import * as db from '@/utils/db';
import * as lib from '@/utils/lib';
import * as userLib from '@/utils/user';
import * as R from 'ramda';

function NewPage({ paper: initData, logInfo, dispatch }: any) {
  const [state, setState] = useState(paperData.map(item => ''));

  const [loading, setLoading] = useState(false);
  const [showErr, setShowErr] = useState(initData.length === 0 ? {} : { msg: '' });

  const [paper, setPaper] = useState(paperData);

  const onSubmmit = async () => {
    if (loading) {
      // 不重复提交
      return;
    }
    // 数据是否完整

    let status = state.findIndex(item => item.trim().length === 0);

    if (status > -1) {
      Toast.fail(`第${status + 1}题未填写`);
      return;
    }

    let param = {};
    R.clone(state).forEach((item, idx) => {
      param['q_' + idx] = item
        .trim()
        .replace(/\\r/g, '')
        .replace(/\\n/g, '');
    });

    param.uid = logInfo.uid;
    param.rec_time = lib.now();

    Toast.success('模拟数据提交');

    db.addCbpcVote201910(param)
      .then(res => {
        userLib.gotoSuccess();
      })
      .catch(e => {
        Toast.fail('提交失败,请勿重复作答');
      });
  };

  return (
    <div>
      <div className={styles.content}>
        <FormComponent data={paper} onChange={setState} state={state} showErr={showErr} />
        <WhiteSpace size="lg" />
      </div>
      <WingBlank>
        <Button type="primary" onClick={onSubmmit} loading={loading} disabled={loading}>
          提交
        </Button>
        <Button
          style={{ marginTop: 20 }}
          onClick={() => {
            router.push('/');
          }}
        >
          返回主页
        </Button>
      </WingBlank>
    </div>
  );
}

export default connect(({ common }: any) => ({ ...common }))(NewPage);

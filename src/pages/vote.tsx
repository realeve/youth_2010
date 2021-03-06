import React, { useState, useEffect } from 'react';
import { Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import styles from './paper.less';
import { connect } from 'dva';
import FormComponent from '@/components/FormComponent';
import * as db from '@/utils/db';
import * as userLib from '@/utils/user';
import * as R from 'ramda';

function NewPage({ paper: initData, user, dispatch }: any) {
  const [state, setState] = useState(['', '', '', '', '', '']);

  const [loading, setLoading] = useState(false);
  const [showErr, setShowErr] = useState(initData.length === 0 ? {} : { msg: '' });

  const radioItemRender = (item, idx) => (
    <div>
      {idx + 1}. <strong>{item[1]}</strong>
      <br />
      <small>{item[0]}</small>
    </div>
  );

  const [paper, setPaper] = useState([]);
  useEffect(() => {
    db.getCbpcyouth2019Votelist().then(({ data }) => {
      let res = data.map((name, idx) => ({ title: radioItemRender(name, idx), type: 'textarea' }));
      setPaper(res);
    });
  }, []);

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
    state.forEach((item, idx) => {
      param['score_' + idx] = item;
    });
    db.setCbpcyouth2019Votelist(param)
      .then(res => {
        userLib.gotoSuccess();
      })
      .catch(e => {
        Toast.fail('提交失败');
      });
  };

  return (
    <div>
      <div className={styles.content}>
        <WingBlank>
          <h3>评委评分</h3>
        </WingBlank>
        <FormComponent
          data={paper}
          onChange={setState}
          state={state}
          showErr={showErr}
          showKey={false}
        />
        <WhiteSpace size="lg" />
      </div>
      <WingBlank>
        <Button
          type="primary"
          onClick={onSubmmit}
          loading={loading}
          disabled={loading || state.findIndex(item => item.trim().length === 0) > -1}
        >
          提交
        </Button>
      </WingBlank>
    </div>
  );
}

export default connect(({ common }: any) => ({ ...common }))(NewPage);

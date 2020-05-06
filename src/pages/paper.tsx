import React, { useState, useEffect } from 'react';
import { Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import styles from './paper.less';
import { connect } from 'dva';
import FormComponent from '@/components/FormComponent';
import * as db from '@/utils/db';
import * as userLib from '@/utils/user';
import * as R from 'ramda';
import md5 from 'md5';
import qs from 'qs';
import { useSetState } from 'react-use';
import moment from 'moment';
import Result from '@/components/Result';

function NewPage({ paper: initData, user, dispatch }: any) {
  const [state, setState] = useState(['']);

  const [loading, setLoading] = useState(false);
  const [showErr, setShowErr] = useState(initData.length === 0 ? {} : { msg: '' });

  let [result, setResult] = useSetState({
    title: '',
    status: '',
    message: '',
    extra: '',
    show: false,
  });

  useEffect(() => {
    let hashArr = window.location.hash.split('?');
    let params = qs.parse(hashArr[1] || '');
    if (hashArr.length < 2) {
      setResult({
        title: '无效链接',
        message: '链接无效，请重新扫码再试。',
        status: 'error',
        show: true,
      });
      return;
    }

    let isValid = moment(Number(params.timestamp))
      .add(10, 's')
      .isAfter(moment());

    if (!isValid) {
      setResult({
        title: '签到失败',
        message: '二维码超时，请重新扫码。',
        status: 'error',
        show: true,
      });
      return;
    }

    let salt = 'cbpc';

    let ts = params.timestamp;
    let token = md5(salt + ts)
      .slice(10, 16)
      .split('')
      .reverse()
      .join('');

    if (token != params.t) {
      setResult({
        title: '无效链接',
        message: '链接无效，请重新扫码再试。',
        status: 'error',
        show: true,
      });
    }
  }, []);

  const [paper, setPaper] = useState([]);
  useEffect(() => {
    db.getCbpcyouth2019Votelist().then(({ data }) => {
      let res = R.flatten(data);
      setPaper([
        {
          title: '请选择您支持的战队:',
          data,
        },
      ]);
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

    let hashArr = window.location.hash.split('?');
    let params = qs.parse(hashArr[1] || '');

    let param = {
      user: user.user,
      timestamp: params.timestamp,
      rec_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      vote: state[0],
    };

    db.addCbpcyouth2019CheckinLog(param)
      .then(res => {
        userLib.gotoSuccess();
      })
      .catch(e => {
        Toast.fail('提交失败,请勿重复投票');
      });
  };

  if (result.show) {
    return <Result {...result} />;
  }

  return (
    <div>
      <div className={styles.content}>
        <FormComponent data={paper} onChange={setState} state={state} showErr={showErr} />
        <WhiteSpace size="lg" />
      </div>
      <WingBlank>
        <Button
          type="primary"
          onClick={onSubmmit}
          loading={loading}
          disabled={loading || state[0].length === 0}
        >
          提交
        </Button>
      </WingBlank>
    </div>
  );
}

export default connect(({ common }: any) => ({ ...common }))(NewPage);

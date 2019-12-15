import React, { useState, useEffect } from 'react';
import { List, Button, WingBlank } from 'antd-mobile';
import paperData from '@/utils/questions';
import styles from './paper.less';
import { useChart, handleTickets } from '@/utils/usePaper';
import * as R from 'ramda';
import ReactCharts from '@/components/Charts';

export default function ChartPage() {
  let src = useChart();
  let [dist, setDist] = useState(src);
  useEffect(() => {
    setDist(src);
  }, [src]);

  let [state, setState] = useState([]);
  useEffect(() => {
    let res = handleTickets(dist);
    setState(res);
  }, [dist]);

  let [chartData, setChartData] = useState([]);

  useEffect(() => {
    let res = state.map((item, idx) => {
      let sum = R.sum(item);
      return item.map((value, i) => ({
        name: paperData[idx].data[i],
        value,
        percent: (value * 100) / sum,
      }));
    });
    setChartData(res);
  }, [state]);

  let [title, setTitle] = useState('综述');

  return (
    <div>
      <h3 style={{ textAlign: 'center', fontWeight: 'normal', letterSpace: '.5em' }}>{title}</h3>
      <WingBlank size="lg" className={styles.operators}>
        <Button
          className={styles.act}
          size="small"
          onClick={() => {
            setTitle('综述');
            setDist(src);
          }}
          type={title === '综述' ? 'primary' : 'ghost'}
        >
          综述
        </Button>
        {/* <Button
          className={styles.act}
          size="small"
          onClick={() => {
            setTitle('中高层管理人员');
            let res = R.filter(item => ['0', '1'].includes(item.vote_detail[5]))(src);
            setDist(res);
          }}
          type={title === '中高层管理人员' ? 'primary' : 'ghost'}
        >
          中高层管理人员
        </Button> */}
      </WingBlank>
      <div
        className={styles.content}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {paperData.map(({ type, title }, idx) => {
          if (type === 'textarea') {
            return null;
          }
          let isBar = idx => chartData[idx].length > 8;
          return (
            <List
              renderHeader={`${idx + 1}.${title}`}
              key={idx}
              style={{ maxWidth: 800, width: '100%' }}
            >
              {chartData[idx] && (
                <ReactCharts
                  data={chartData[idx]}
                  style={{ height: isBar(idx) ? 600 : 400 }}
                  type={isBar(idx) ? 'bar' : 'pie'}
                  title={title}
                />
              )}
            </List>
          );
        })}
      </div>
    </div>
  );
}

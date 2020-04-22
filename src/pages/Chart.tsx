import React, { useState, useEffect } from 'react';
import { List, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import styles from './paper.less';
import * as db from '@/utils/db.js';
import * as lib from '@/utils/lib';
import Excel from '@/utils/excel';
import Chart from '@/components/Charts';

export const getUrl = () => {
  let { host, protocol, pathname } = window.location;
  return `${protocol}//${host}/${pathname}#paper`;
};

export default function ChartPage() {
  let [chartData, setChartData] = useState({});

  const loadPaper = async () => {
    let data = await db.getCbpcSport2020();
    setChartData(data);
  };

  useEffect(() => {
    loadPaper();
  }, []);

  const exportExcel = (data, title = '安全答题得分明细 ') => {
    if (!data) {
      return;
    }
    let excel = new Excel({
      header: data.header,
      body: data.data,
      filename: title + lib.ymdhms(),
    });
    excel.save();
  };

  const [score, setScore] = useState(null);
  const [passed, setPassed] = useState(null);
  const [rate, setRate] = useState(null);
  const [uncomplete, setUncomplete] = useState(null);
  useEffect(() => {
    db.getCbpcSport2020Score(34).then(setScore);
    db.getCbpcSport2020Summary(34).then(setPassed);
    db.getCbpcSport2020Passrate(34).then(setRate);
    db.getCbpcSport2020Uncomplete(34).then(setUncomplete);
  }, []);

  // console.log(score);

  return (
    <div>
      {chartData && (
        <>
          <h3 style={{ textAlign: 'center', fontWeight: 'normal', letterSpace: '.5em' }}>
            {chartData.title}
            <br />
            (参与人数:{chartData.rows}; 通过人数：
            {(chartData.data || []).filter(item => item[2] >= 90).length})
          </h3>
          <WingBlank style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => exportExcel(chartData, '安全得分明细 ')}
              style={{ width: 150 }}
              type="primary"
            >
              导出今日数据
            </Button>
          </WingBlank>
          {uncomplete && (
            <WingBlank style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => exportExcel(uncomplete, '未参与人员名单 ')}
                style={{ width: 250 }}
                type="primary"
              >
                导出未参与人员数据({uncomplete.rows}人)
              </Button>
            </WingBlank>
          )}
        </>
      )}

      <WhiteSpace />

      {passed && (
        <List
          renderHeader="今日得分汇总"
          style={{ maxWidth: 800, width: '100%', margin: '10px auto' }}
        >
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {(passed.header || []).map((item, idx) => (
                <span style={{ width: 160 }} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </List.Item>
          {(passed.data || []).map((item, idx) => (
            <List.Item key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {item.map((td, i) => (
                  <span style={{ width: 160 }} key={td}>
                    {td}
                  </span>
                ))}
              </div>
            </List.Item>
          ))}
        </List>
      )}

      <WhiteSpace />
      <div
        className={styles.content}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 820,
          }}
        >
          <List
            style={{ maxWidth: 400, marginRight: 20, width: '100%' }}
            renderHeader="各部门平均得分(分)"
          >
            {score && <Chart data={score.data} style={{ height: 950 }} type="bar" title="" />}
          </List>
          <List
            style={{ maxWidth: 400, marginRight: 20, width: '100%' }}
            renderHeader="各部门通过率(%)"
          >
            {rate && <Chart data={rate.data} style={{ height: 950 }} type="bar" title="" />}
          </List>
          {/* <List style={{ maxWidth: 400, width: '100%' }} renderHeader="各部门平均得分">
            {score && <Chart data={score.data} style={{ height: 950 }} type="bar" title="" />}
          </List> */}
        </div>

        <List renderHeader="今日得分明细" style={{ maxWidth: 800, width: '100%' }}>
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>#</span>
              {(chartData.header || []).map((item, idx) => (
                <span key={item} style={{ width: idx > 2 ? 180 : 100 }}>
                  {item}
                </span>
              ))}
            </div>
          </List.Item>
          {(chartData.data || []).map((item, idx) => (
            <List.Item key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{idx + 1}</span>
                {item.map((td, i) => (
                  <span
                    key={td}
                    style={{
                      width: i > 2 ? 180 : 100,
                      color: i == 2 && td < 90 ? '#e23' : 'unset',
                    }}
                  >
                    {td}
                  </span>
                ))}
              </div>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}

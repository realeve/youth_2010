import { useEffect, useState } from 'react';
import * as R from 'ramda';
import * as db from '@/utils/db.js';
import * as lib from '@/utils/lib';

export function useChart() {
  const [src, setSrc] = useState([]);
  const loadPaper = async () => {
    let data = await db.getCbpcVote201910();

    setSrc(data);
  };
  useEffect(() => {
    loadPaper();
  }, []);
  return src;
}

export default function usePaper() {
  const [paper, setPaper] = useState({});
  const [state, setState] = useState([]);
  const loadPaper = async () => {
    let data = await db.getCbpcVote201910();

    let temp = R.clone(data);

    let res = data.map(item => {
      item = item.map(answer => {
        if (answer.length === 0) {
          return answer;
        } else if (typeof answer === 'string') {
          return lib.alphaRange[Number(answer)];
        } else {
          return answer.map(idx => lib.alphaRange[Number(idx)]).join('、');
        }
      });
      return item;
    });
    let questionIdx = R.range(1, 36).map(item => `第${item}题`);
    const config = {
      header: ['用户信息', '开始时间', '记录时间', ...questionIdx],
      body: res,
      filename: '员工归属感调查调查_' + lib.now(),
    };

    setPaper(config);
    let res2 = handleTickets(temp);
    // 累计票数
    // console.log(res2);
    setState(res2);
  };

  useEffect(() => {
    loadPaper();
  }, []);
  return [paper, state];
}

export const handleTickets = temp => {
  let res2 = [];
  temp.forEach(item => {
    item.forEach((answer, idx) => {
      res2[idx] = res2[idx] || [];
      if (answer.length > 0) {
        if (typeof answer === 'string') {
          if (R.isNil(res2[idx][Number(answer)])) {
            res2[idx][Number(answer)] = 1;
          } else {
            res2[idx][Number(answer)] += 1;
          }
        } else {
          answer.forEach(detail => {
            if (R.isNil(res2[idx][Number(detail)])) {
              res2[idx][Number(detail)] = 1;
            } else {
              res2[idx][Number(detail)] += 1;
            }
          });
        }
      }
    });
  });
  res2 = R.reject(item => item.length === 0)(res2);
  res2 = res2.map(item => {
    for (let i = 0; i < item.length; i++) {
      if (R.isNil(item[i])) {
        item[i] = 0;
      }
    }
    return item;
  });
  return res2;
};

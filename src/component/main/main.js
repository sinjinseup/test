import { useEffect, useState } from 'react';
import trend from '../../hotseller-dataset/pretty/hashtag_trend.json';
import * as Com from '../../commnt';

const Main = (props) => {

    console.log(trend);

    const [list, setList] = useState();

    const [days, setDays] = useState(1);

    useEffect(() => {
        const keys = Object.keys(trend);
        console.log(keys);

        const result = {};

        for(let i=0; i<keys.length; i++){
            if(keys[i].indexOf(days) > -1){
                if(keys[i].indexOf('gap') > -1){
                    console.log(keys[i]);
                    result.gap = trend[keys[i]];
                }

                if(keys[i].indexOf('rate') > -1){
                    console.log(keys[i]);
                    result.rate = trend[keys[i]];
                }
            }
        }

        result['recent_list'] = trend.recent_list;

        console.log(result);
        setList(result);

    }, [days]);

    console.log(list);

    const changeDays = (state) => {
        setDays(state);
    }

    return(
        <div>

            <button onClick={() => changeDays(1)}>하루</button>
            <button onClick={() => changeDays(7)}>일주일</button>
            <button onClick={() => changeDays(30)}>한달</button>
            <button onClick={() => changeDays(60)}>두달</button>
            {/* 증가량이 제일 높은 데이터 */}
            <ol>
            {
                list === undefined ? '로딩중' :
                
                list.gap.map((value, index) => {
                    return(
                        <>
                            <li>현재 포스팅 수 : {value.post_cnt}</li>
                            <li>최근 {days} 일간 포스트 량 : {value.post_gap}</li>
                            <li>최근 {days} 일간 포스트 증가율 : {value.post_rate} {value.post_rate > 0 ? '증가' : '감소'}</li>
                            <li>#{value.hashtag}</li>
                        </>
                    )
                })

            }
            </ol>

            {/* 증가율이 제일 높은 데이터 */}
            <ol>
            {
                list === undefined ? '로딩중' :
                
                list.rate.map((value, index) => {
                    return(
                        <>
                            <li>현재 포스팅 수 : {value.post_cnt}</li>
                            <li>최근 {days} 일간 포스트 량 : {value.post_gap}</li>
                            <li>최근 {days} 일간 포스트 증가율 : {value.post_rate} {value.post_rate > 0 ? '증가' : '감소'}</li>
                            <li>#{value.hashtag}</li>
                        </>
                    )
                })
                
            }
            </ol>

            {/* 감소 전용 리스트 */}
            <ol>
            {
                list === undefined ? '로딩중' :
                
                list['recent_list'].map((value, index) => {
                    return(
                        <>
                            <li>현재 포스팅 수 : {Com.numberFormat(value.post_cnt)}</li>
                            <li>{value.add_date}</li>
                            <li>{Com.toHHMMSS(value.check_start_time)}</li>
                            <li>#{value.hashtag}</li>
                        </>
                    )
                })

            }
            </ol>

        </div>
    )
}

export default Main;

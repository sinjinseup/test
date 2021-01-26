import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Com from '../../commnt';
import { Link } from 'react-router-dom';

const Main = (props) => {

    const [list, setList] = useState();

    const [days, setDays] = useState(1);

    let trend = null;

    useEffect(async () => {

        await axios.get('/hotseller-dataset/pretty/hashtag_trend.json').then(res => trend = res.data);

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

    console.log(list?.gap === undefined);

    const changeDays = (state) => {

        let count = document.getElementsByClassName('count')[0];
        let percent = document.getElementsByClassName('percent')[0];

        count.scrollTop = 0;
        percent.scrollTop = 0;

        setDays(state);
    }

    const goToDetatil = (data) => {
        props.history.push(`/${data}`);
    }
    return(
        <div>


            {/* 분석중인 리스트 */}
            <div className="main-data">
            {
                list === undefined ? '로딩중' :
                
                list['recent_list'].map((value, index) => {
                    return(
                        <div>
                            <span className="hashtaging" onClick={() => goToDetatil(value.hashtag)}>#{value.hashtag}</span><br />
                            <dl>
                                <dt>현재 포스팅 수 : </dt>
                                <dd>{Com.numberFormat(value.post_cnt)}</dd>
                            </dl>
                            <dl>
                                <dt>등록일 : </dt>
                                <dd>{Com.dateYmd(value.add_date)}</dd>
                            </dl>
                            <dl>
                                <dt>분석일 : </dt>
                                <dd>{Com.toHHMMSS(value.check_start_time)}</dd>
                            </dl>
                        </div>
                    )
                })

            }
            </div>

            <div className="button-group">
                <div className={"button-slide " + (days === 1 ? 'chioce' : '')} onClick={() => changeDays(1)}>하루</div>
                <div className={"button-slide " + (days === 7 ? 'chioce' : '')} onClick={() => changeDays(7)}>일주일</div>
                <div className={"button-slide " + (days === 30 ? 'chioce' : '')} onClick={() => changeDays(30)}>한달</div>
                <div className={"button-slide " + (days === 60 ? 'chioce' : '')} onClick={() => changeDays(60)}>두달</div>
            </div>

            {/* 증가량이 제일 높은 데이터 */}
            <div className="main-data count">
                <h2>{days}일 간 증가량 순</h2>
            {
                list === undefined ? '로딩중' :
                
                list.gap.map((value, index) => {
                    return(
                        <div className="update-count-data">
                            <span className="hashtaging" onClick={() => goToDetatil(value.hashtag)}>#{value.hashtag}</span>
                            <dl>
                                <dt>현재 포스팅 수 : </dt>
                                <dd>{Com.numberFormat(value.post_cnt)}</dd>
                            </dl>
                            <dl>
                                <dt>포스트 량 : </dt>
                                <dd>{Com.numberFormat(value.post_gap)}</dd>
                            </dl>
                            <dl>
                                <dt>포스트 율 : </dt>
                                <dd>{value.post_rate}% <span className={(value.post_rate > 0 ? 'up' : 'down')}></span></dd>
                            </dl>
                        </div>
                    )
                })

            }
            
            </div>

            {/* 증가율이 제일 높은 데이터 */}
            <div className="main-data percent">
            <h2>{days}일 간 증가율 순</h2>
            {
                list === undefined ? '로딩중' :
                
                list.rate.map((value, index) => {
                    return(
                        <div className="update-count-data">
                            <span className="hashtaging" onClick={() => goToDetatil(value.hashtag)}>#{value.hashtag}</span>
                            <dl>
                                <dt>현재 포스팅 수 : </dt>
                                <dd>{Com.numberFormat(value.post_cnt)}</dd>
                            </dl>
                            <dl>
                                <dt>포스트 량 : </dt>
                                <dd>{Com.numberFormat(value.post_gap)}</dd>
                            </dl>
                            <dl>
                                <dt>포스트 율 : </dt>
                                <dd>{value.post_rate} %<span className={(value.post_rate > 0 ? 'up' : 'down')}></span></dd>
                            </dl>
                        </div>
                    )
                })
                
            }
            </div>
        </div>
    )
}

export default Main;

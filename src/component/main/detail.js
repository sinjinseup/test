import axios from "axios";
import { useEffect, useState } from "react";
import Gap from "./gap";
import TopHash from "./top.hashtag";

const Detatil = (props) => {

    const fileName = props.match.params.id+'.json';

    const [ view, setView ] = useState();

    const [days, setDays] = useState('lately_popular');

    useEffect(async () => {
        
        let data = null;

        const url = './hotseller-dataset/pretty/hashtag_info/'+fileName; console.log(url);

        await axios.get(url).then(res => {
            data = res.data;

            if(data?.result !== undefined){
                delete data.result;    
            }
    
            const keys = Object.keys(data);
    
            let result = {};
            result.info = data.info;
            result.top_autocomplete = data.top_autocomplete;
            
            const resultKey = Object.keys(result);
    
            const filter = keys.filter(val => !resultKey.includes(val));
    
            result.keys = filter;
    
            for(let i=0; i<keys.length; i++){
                if(keys[i].indexOf(days) > -1){
                    result.gap = data[keys[i]];
                }
            }
    
            setView(result);

        }).catch(e => {
            console.log(e);
        });

        
    }, [days]);

    const changeDays = (state) => {

        setDays(state);
    }

    const backHandler = () => {
        console.log(props.history);
        props.history.go(-1);
    }

    console.log(view?.keys);

    return(
        <div>
            {
                ((view) => {
                    console.log(view);

                    if(view !== undefined){
                        return(
                            <div>
                                <h2 style={{textAlign:'left'}}>
                                    {view.info?.hashtag} <span>{view.info?.post_cnt}</span>
                                </h2>
                                <span>베스트 해쉬태그</span><br></br>
                                {
                                    
                                    view?.top_autocomplete !== undefined ? 
                                        view?.top_autocomplete.map((value, index) => {
                                            return(
                                                <TopHash value={value}></TopHash>
                                            )
                                            
                                        })
                                        : '로딩'
                                }

                                <br></br>
                                <div className="button-group">
                                {
                                    view?.keys !== undefined ? view?.keys.map((value, index) => {
                                        return(
                                            <div style={{'display':'inline'}} className="button-slide" onClick={() => changeDays(value)}>
                                                <span>{value}</span>
                                            </div>
                                        )
                                    }) : '로딩'
                                }
                                </div>
                                {
                                    days === undefined ? '로딩' : 
                                    ((keys) => {
                                        console.log(keys);
                                        if(keys === 'top_relation'){
                                            return(
                                                <h2>연관 해쉬</h2>
                                            )
                                        }else{
                                            if(keys.indexOf('top_id') > -1){
                                                return(
                                                    <h2>탑 아이디</h2>
                                                )
                                            }else if(keys === 'post_log'){
                                                return(
                                                    <h2>태그 로그</h2>
                                                )
                                            }else{
                                                return(
                                                    <h2>회원 상태</h2>
                                                )
                                            }
                                        }
                                    })(days)
                                }

                                {
                                    view?.gap !== undefined ? view?.gap.map((value, index) => {
                                        return(
                                            <Gap value={value} keys={days}></Gap>
                                        )
                                    }) : '로딩'
                                }
                                <br></br>
                                <button onClick={() => backHandler()}>뒤로가기</button>
                            </div>
                        )
                    }else{
                        return(
                            <div>
                                <h3>해당하는 데이터가 없습니다.</h3>
                                <button onClick={() => backHandler()}>뒤로가기</button>
                            </div>
                        )
                    }

                })(view)
            }
        </div>
    )
}


export default Detatil;
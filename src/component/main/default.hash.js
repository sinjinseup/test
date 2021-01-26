import { useState } from "react";

const DefaultHash = (props) => {
    
    const value = props.value;
    
    const [viewId, setViewId] = useState('');

    const memberView = (id) => {
        const data = (id === viewId) ? '' : id;

        setViewId(data);
    }

    return(
        <>
        {
            value === undefined ? '로딩' : 
            <div className="test2" onClick={() => memberView(value['id_data'].username)}>
                <span>{value.url}</span>
                <span>{value['id_data'] === undefined ? ''  : value['id_data'].username}</span>
                <span>좋아요{value.like_cnt}</span>
                <span>댓글{value.comment_cnt}</span>
                <span>영상{value.mov_cnt}</span>
                <span>사진{value.pic_cnt}</span>
        

                {/* "follower_cnt": 1280,       #팔로워 수
                "follow_cnt": 981,          #팔로우 수
                "post_cnt": 1439,           #포스팅 수
                "average_like_cnt": 326,    #게시물 평균 좋아요 수
                "average_comment_cnt": 0,   #게시물 평균 댓글 수
                "average_post_hour": 34,    #게시물 평균 포스팅 간격(시간)
                "full_name": "name1",       #사용자 이름
                "is_business": true,        #비즈니스 여부
                "is_verified": false,       #인증 계정 여부 */}                
            </div>
        }
        {
            value['id_data'] === undefined ? ''  : 
            <div className={(value['id_data'].is_business === true ? 'business' : '') + ' ' + (value['id_data'].is_verified === false ? 'verified-n' : 'verified-y') }>
                <span>팔로워 수 : {value['id_data'].follower_cnt}</span>
                <span>포스팅 수 : {value['id_data'].post_cnt}</span>
                <span>평균 좋아요 수 : {value['id_data'].average_like_cnt}</span>
                <span>평균 댓글 수 : {value['id_data'].average_comment_cnt}</span>
                <span>평균 포스팅 시간 : {value['id_data'].average_post_hour}</span>
            </div>
        }
        {
                    value['id_data'] === undefined ? '없음' : 
                    value['id_data'].post_list.map((value, index) => {
                        return(
                            <div className={'test ' +(viewId === '' ? '' : 'on')}>
                                <span>{value.url}</span>
                                <span>{value.username}</span>
                                <span>{value.contents}</span>
                                {/* <span>{value.content_length}</span> */}
                                <span>{value.comment_cnt}</span>
                                <span>좋아요{value.like_cnt}</span>
                                <span>댓글{value.comment_cnt}</span>
                                <span>영상{value.mov_cnt}</span>
                                <span>사진{value.pic_cnt}</span>
                                <span>{value.post_time}</span>
                            </div>
                        )
                        
                    })
                }

        </>
    )
}


export default DefaultHash;
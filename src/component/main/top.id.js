
const Topid = (props) => {
    
    const value = props.value;

    return(
        <>
        {
            value === undefined ? '로딩' : 
            <div>
                <span>{value.score}</span>
                <span>{value.username}</span>
                <span>좋아요{value.average_like_cnt}</span>
                <span>댓글{value.post_cnt}</span>
                <span>영상{value.follow_cnt}</span>
                <span>사진{value.follower_cnt}</span>
    
            </div>
        }
        </>
    )
}


export default Topid;
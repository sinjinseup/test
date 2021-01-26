import DefaultHash from "./default.hash";
import PostLog from "./post.log";
import TopHash from "./top.hashtag";
import Topid from "./top.id";

const Gap = (props) => {

    console.log(props.value);

    const value = props.value;

    const keys = props.keys;

    return(
        <>
        {
            value === undefined ? '로딩' : 
            ((keys) => {
                console.log(keys);
                if(keys === 'top_relation'){
                    return(
                        <TopHash value={value} key={keys}></TopHash>
                    )
                }else{
                    if(keys.indexOf('top_id') > -1){
                        return(
                            <Topid value={value}></Topid>
                        )
                    }else if(keys === 'post_log'){
                        return(
                            <PostLog value={value}></PostLog>
                        )
                    }else{
                        return(
                            <DefaultHash value={value}></DefaultHash>
                        )
                    }
                }
            })(keys)
        }
        </>
    )
}

export default Gap
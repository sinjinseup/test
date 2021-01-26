const TopHash = (props) => {

    console.log(props.keys);
    const value = props.value;
    const keys = props.keys;
    return(
        <>
        <div style={{'display':'inline'}} className="best-hashtag">
            
            <span className="hashtaging">#{value.hashtag}</span>
            <span>{value.post_cnt}</span>
        </div>
        </>
    )
}

export default TopHash;
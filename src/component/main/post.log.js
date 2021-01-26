const PostLog = (props) => {

    const value = props.value;
    return(
        <div>
            <span>{value.check_date}</span>
            <span>{value.post_cnt}</span>
        </div>
    )
}

export default PostLog;
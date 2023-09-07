const SearchResult = ({ searchUsers }) => {
    return (
        <div className="mt-4" id="searchResults">
            {searchUsers.map((user)=>{
                return(
                    <div style={{textAlign:"center"}}>
                        <div id="profileImg" style={{marginBottom:"35px"}}>
                            <img className="img-radius" src={user.user_profile} alt="User-Profile-Image" />
                        </div>
                        <p><big>{user.user_name}</big>　{user.dept.dept_name}/{user.user_position}</p>
                        <div>전화번호 : {user.user_phone}</div>
                        <div>이메일 : {user.user_email}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResult;
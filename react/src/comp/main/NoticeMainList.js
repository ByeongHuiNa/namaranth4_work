import {Link} from "react-router-dom";

const NoticeMainList = ({ notices }) => {
    return (
        <ul id="noticeList" className="mt-2">
            {notices.map((notice) => {
                return(
                <Link to={`/notice/get/${notice.noti_no}`} style={{ textDecoration: "none", color:"black"}}>
                    <li>
                        <i className="bi bi-stop-fill listIconSet"></i> {notice.noti_no}. 
                        <strong> {notice.noti_title}</strong>　<small>[{notice.user.user_name}]</small>
                        <input type="hidden" value={notice.noti_title} id="noticeTitle"/>
                        <input type="hidden" value={notice.noti_content} id="noticeContent"/>
                    </li>
                </Link>
                )
            })}
        </ul>
    )
}

export default NoticeMainList;
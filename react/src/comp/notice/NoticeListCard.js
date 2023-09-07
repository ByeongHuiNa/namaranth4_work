import moment from "moment"

const NoticeListCard = ({notice, onClick}) => {
    const formattedNoticeTime = moment(notice.noti_regdate).format('YYYY/MM/DD');

    return (
        <tr onClick={() => onClick(notice.noti_no)}>
            <td className="align-middle">
                <div>
                    {notice.noti_no}
                </div>
            </td>
            <td className="align-middle">
                <div>
                    {notice.noti_title}
                </div> 
            </td>
            <td className="align-middle">
                <div>
                    {notice.user.user_name}
                </div>
            </td>
            <td className="align-middle">
                <div>
                    {formattedNoticeTime}
                </div>
            </td>
        </tr>
    )
}

export default NoticeListCard;
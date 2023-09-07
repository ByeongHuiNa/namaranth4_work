import moment from "moment"

const MailMainList = (props) => {
    return (
        <tbody id="mailList">
        {(props.emails).map((email) => {
            let formattedMailTime = moment(email.mail_regdate).format('YYYY/MM/DD');
                return (
                    <tr key={email.mail_no} onClick={() => props.showMailModal(email)}>
                        <td>
                            <div className="chk-option">
                                <label
                                    className="check-task custom-control custom-checkbox d-flex justify-content-center done-task">
                                    <input type="checkbox" className="custom-control-input"/>
                                    <span className="custom-control-label"></span>
                                </label>
                            </div>
                        </td>
                        <td className="align-middle">
                            {email.mail_title}
                            <input type="hidden" value={email.mail_title} className="mailTitle"/>
                        </td>
                        <td className="align-middle">{email.user_name}
                            <input type="hidden" value={email.user_name} className="mailUserName"/>
                        </td>
                        <td className="align-middle">{formattedMailTime}</td>
                    </tr>
                );
            })}
        </tbody>
    ) 
}

export default MailMainList;
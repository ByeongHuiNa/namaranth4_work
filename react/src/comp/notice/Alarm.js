const Alarm = ({message, hideAlarmNotice}) => {
    return (
        <div className="alert alert-primary alert-dismissible fade show noticeAlarm" role="alert" style={{backgroundColor:"white", border:"1px solid #1abc9c", color:"#1abc9c"}}>
            <div>{message}</div>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" onClick={hideAlarmNotice}>&times;</span></button>
        </div>
    )
}

export default Alarm;
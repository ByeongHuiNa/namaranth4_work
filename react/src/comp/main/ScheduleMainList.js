import moment from "moment"

const ScheduleMainList = ({ schedules }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5><i className="bi bi-calendar3 iconSet"></i>오늘의 일정</h5>
            </div>
            <div className="card-body main-card-body readDoc2">
                <ul id="scheduleList">
                    {
                        schedules.map((schedule) => {
                            let formattedSchStartTime = moment(schedule.sch_start).format('YYYY/MM/DD');
                            let formattedSchEndTime = moment(schedule.sch_end).format('YYYY/MM/DD');
                            return (

                                <li>
                                    <div style={{ marginBottom: "0px !important" }}><i className="bi bi-stop-fill listIconSet"></i><b>{schedule.sch_name}</b></div>
                                    <div style={{ color: "grey", paddingLeft: "20px" }}><small>{formattedSchStartTime} ~ {formattedSchEndTime}</small></div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ScheduleMainList;
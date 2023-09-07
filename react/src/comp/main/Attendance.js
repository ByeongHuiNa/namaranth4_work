import React from "react";

const Attendance = ({ formattedStartTime, formattedEndTime, attend }) => {
    return (
        <div>
            {formattedStartTime !== '' && (
                <div>
                    <div className="myinfo" id="startTime" style={{ color:'grey', paddingTop:'8px' }}><b>출근</b> : {formattedStartTime}</div>
                    <input type="hidden" value={attend.at_no} id="attendNo"/>    
                </div>
            )}

            {formattedEndTime !== '' && (
                <div className="myinfo" id="endTime" style={{color:'grey', paddingTop:'3px'}}><b>퇴근</b> : {formattedEndTime}</div>
            )}   
        </div>
    )
}

export default Attendance;
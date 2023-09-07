import React, { useState, useEffect } from 'react';
import CalendarForm from './CalendarForm';
import ScheduleForm from './ScheduleForm';
import DeleteModal from './DeleteModal';

const CalendarList = ({calendarList, showSchedule, scheduleHandler, users, calendarListHandler}) => {
    
  const [showCalForm, setShowCalForm] = useState(false);
  const [showSchForm, setShowSchForm] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openCalForm = () => {
    setSelectedCalendar(null); 
    setShowCalForm(true);
    setSelectedUsers([]);
  };
  const closeCalForm = () => setShowCalForm(false);

  const openSchForm = () => setShowSchForm(true);
  const closeSchForm = () => setShowSchForm(false);

  const openCalConstForm = (calendar) => {
    setSelectedCalendar(calendar);
    setShowCalForm(true);
    console.log(calendar);
  };

  const deleteCalModal = (calendar) =>{
    setSelectedCalendar(calendar);
    setShowDeleteModal(true);
  }

  const closeDeleteModal = () => setShowDeleteModal(false);

  
  return (
    <div className="calendar-side">
    {/* 일정 등록 버튼 */}
    <button
        type="button"
        className="btn btn-primary"
        id="create-sch"
        onClick={openSchForm}
    >
        일정등록
    </button>
        <ScheduleForm
            show={showSchForm}
            handleClose={closeSchForm}
        />

    <div className="calendar-list-wrap">
        <div className="title-wrap">
        <div 
          id="calendar-list-title"
          onClick={showSchedule}
        >
          내 캘린더
        </div>
        <div>
            <button
            type="button"
            id="create-cal"
            onClick={openCalForm}
            >
            <i className="bi bi-plus fs-10" id="whitePlus"></i>
            </button>
        </div>
        <CalendarForm
            show={showCalForm}
            handleClose={closeCalForm}
            users={users}
            editing={selectedCalendar !== null}
            cal_no={selectedCalendar ? selectedCalendar.cal_no : null}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            calendarListHandler={calendarListHandler}
        />
        </div>
        
        <table id="calendar-list-table">
          {calendarList.map((calendar) => (
            <tr 
                className="calendar-list" 
                key={calendar.cal_no}
                onClick={()=>scheduleHandler(calendar.cal_no)}
            >
              {/* cal_no 필드 */}
              <td>
                <input
                  type="hidden"
                  className="cal_no"
                  value={calendar.cal_no}
                />
              </td>
              {/* 캘린더 이름과 색상 */}
              <td>
                <div className="text-with-box">
                  <span
                    className="color-box"
                    style={{ backgroundColor: calendar.cal_color }}
                  ></span>
                  {calendar.cal_name}
                </div>
              </td>
              {/* 공유 캘린더 아이콘 */}
              <td id="cal-share">
                {calendar.sharedCalendar && (
                  <i className="bi bi-people-fill"></i>
                )}
              </td>
              {/* 생성자 수정 버튼 */}
              <td id="cal-const">
                {1 === calendar.users.user_no && (
                  <button
                    type="button"
                    id="cal-const-update-btn"
                    data-calno={calendar.cal_no}
                    onClick={() => openCalConstForm(calendar)}
                  >
                    <i className="bi bi-gear"></i>
                  </button>
                )}
              </td>
              {/* 생성자 삭제 버튼 */}
              <td>
                {1 === calendar.users.user_no && (
                  <button
                    type="button"
                    id="cal-const-delete-btn"
                    data-calno={calendar.cal_no}
                    onClick={() => deleteCalModal(calendar)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
      <DeleteModal
        show = {showDeleteModal}
        closeDeleteModal={closeDeleteModal}
      />
    </div>
  );
}

export default CalendarList;





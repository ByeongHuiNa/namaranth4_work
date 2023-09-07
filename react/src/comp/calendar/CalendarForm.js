import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CalPartiModal from './CalPartiModal';
import axios from 'axios';


const CalendarForm = ({ show, handleClose, users, editing, 
  cal_no, selectedUsers, setSelectedUsers, calendarListHandler }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  
  const handleShareModalOpen = () => setShowShareModal(true);
  const handleShareModalClose = () => setShowShareModal(false);
  
  const [formData, setFormData] = useState({ 
    users: {user_no : 1},
    cal_name: '',
    cal_color: '',
    cal_con: '',
    calParti_no: []
  });

  const handleColorButtonClick = (color) => {
    setFormData({ ...formData, cal_color: color });
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const calPartiNumbers = selectedUsers.map((user) => user.user_no);
    console.log(calPartiNumbers);
  
    const requestData = {
      calendarVO:{
        users: {user_no : 1},
        cal_no: formData.cal_no,
        cal_name: formData.cal_name,
        cal_color: formData.cal_color,
        cal_con: formData.cal_con
      },
      calParti_no: calPartiNumbers
    };
  
    //console.log(calPartiNumbers);
    //console.log(requestData);

    if(editing && cal_no){
      axios.put(`/calendar/${cal_no}`, requestData ).then(res => {
        console.log(res);
        calendarListHandler();
        handleClose();
      });
    }else{
      axios.post('/calendar/register', requestData ).then((res) => {
        console.log(res);
        calendarListHandler();
        handleClose();
      });
    }
    
  };


  useEffect(() => {
    if (editing && cal_no) {
      axios.all([
        axios.get(`/calendar/${cal_no}`),
        axios.get(`/calendar/${cal_no}/calParti`)
      ])
      .then(axios.spread((calendarRes, calPartiRes) => {
        setSelectedUsers(calPartiRes.data);
        setFormData(calendarRes.data);
        //console.log(calPartiRes.data);
      }));
    } 
    else {
      setFormData({ 
        users: {user_no : 1},
        cal_name: '',
        cal_color: '',
        cal_con: '',
        calParti_no: []
      });
    }
  }, [cal_no, editing]);


  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>내 캘린더 {editing ? '수정' : '추가'}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form>
          <div className="form-group">
            <label className="floating-label">캘린더명</label>
            <input
              type="text"
              className="form-control"
              name="cal_name"
              value={formData.cal_name}
              onChange={(e) => setFormData({ ...formData, cal_name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="hidden"
              name="user_no"
              value={formData.user_no}
            />
          </div>
          <div className="form-group">
            <label className="floating-label">캘린더 색상</label>
            <div>
              {/* 여러 색상 버튼 생성 */}
              <button
                type="button"
                className={`color-box ${formData.cal_color === '#8B0000' ? 'selected' : ''}`}
                style={{ backgroundColor: '#8B0000' }}
                onClick={() => handleColorButtonClick('#8B0000')}
              ></button>
              <button
                type="button"
                className={`color-box ${formData.cal_color === '#FF8C00' ? 'selected' : ''}`}
                style={{ backgroundColor: '#FF8C00' }}
                onClick={() => handleColorButtonClick('#FF8C00')}
              ></button>
              <button
                type="button"
                className={`color-box ${formData.cal_color === '#FFD700' ? 'selected' : ''}`}
                style={{ backgroundColor: '#FFD700' }}
                onClick={() => handleColorButtonClick('#FFD700')}
              ></button>
              <button
                type="button"
                className={`color-box ${formData.cal_color === '#006400' ? 'selected' : ''}`}
                style={{ backgroundColor: '#006400' }}
                onClick={() => handleColorButtonClick('#006400')}
              ></button>
              <button
                type="button"
                className={`color-box ${formData.cal_color === '#00008B' ? 'selected' : ''}`}
                style={{ backgroundColor: '#00008B' }}
                onClick={() => handleColorButtonClick('#00008B')}
              ></button>
              <button
                type="button"
                className={`color-box ${formData.cal_color === '#4B0082' ? 'selected' : ''}`}
                style={{ backgroundColor: '#4B0082' }}
                onClick={() => handleColorButtonClick('#4B0082')}
              ></button>
            </div>
            <input
              type="hidden"
              className="form-control color-input"
              name="cal_color"
              value={formData.cal_color}
            />
          </div>
          <div className="form-group">
            <label className="floating-label">공유 멤버</label>
            <button
              type="button"
              className="btn btn-primary"
              id="calParti-btn"
              onClick={handleShareModalOpen}
            >
              <i className="bi bi-plus fs-10" id="blackPlus"></i>
            </button>
            <CalPartiModal
              show={showShareModal}
              handleClose={handleShareModalClose}
              users={users}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
            <div className="calParti-fin">
              <table id="calParti-fin-table">
                <tbody>
                  {selectedUsers.map((user) => (
                    <tr key={user.user_no}>
                      <td>{user.dept.dept_name}</td>
                      <td>{user.user_name}</td>
                      <td>{user.user_position}</td>
                      <td>{user.user_email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group">
            <label className="floating-label">설명</label>
            <input
              type="text"
              className="form-control"
              name="cal_con"
              value={formData.cal_con}
              onChange={(e) => setFormData({ ...formData, cal_con: e.target.value })}
            />
          </div>
          <div className="buttonCenter">
            <button
              type="button"
              className="submitCancel"
              onClick={handleClose}
            >
              취소
            </button>
            <button 
              type="button" 
              className="submitBtn"
              onClick={onSubmit}
            >
              {editing ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CalendarForm;

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const CalPartiModal = ({ show, handleClose, users, selectedUsers, setSelectedUsers  }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [addUsers, setAddUsers] = useState([]);

  const handleCloseModal = () => {
    setAddUsers([]); 
    setSelectedRows2([]); 
    handleClose();
  };

  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
    //console.log(selectedRows);
  };

  const handleRowClick2 = (index) => {
    if (selectedRows2.includes(index)) {
      setSelectedRows2(selectedRows2.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows2([...selectedRows2, index]);
    }
  };


  const handlePlusCalClick = () => {
    const newAddUsers = selectedRows.map((index) => users[index]);
    setAddUsers([...addUsers, ...newAddUsers]);
    setSelectedRows([]);
  };

  const handleMinusCalClick = () => {
    const selectedIndexes = selectedRows2;
    const updatedAddUsers = addUsers.filter((user, index) => !selectedIndexes.includes(index));
    setAddUsers(updatedAddUsers);
    setSelectedRows2([]);
  };

  const handleCPartiOkClick = () => {
    setSelectedUsers(addUsers);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>공유 멤버 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="calPartiList-wrap">
          <div class="calPartiList">
            <table class="calPartiList-table">
              <thead class="calPartiList-head">
                <tr>
                  <th><input type="hidden" value="사원번호" /></th>
                  <th>부서</th>
                  <th>사원명</th>
                  <th>직급</th>
                  <th>이메일</th>
                </tr>
              </thead>
              <tbody id="calPartiList-body">
                {users.map((user, index) => (
                  <tr
                    key={user.user_no}
                    onClick={() => handleRowClick(index)}
                    className={selectedRows.includes(index) ? 'selected-rows' : ''}
                  >
                    <td>
                      <input
                        type="hidden"
                        value={user.user_no}
                      />
                    </td>
                    <td>{user.dept.dept_name}</td>
                    <td>{user.user_name}</td>
                    <td>{user.user_position}</td>
                    <td>{user.user_email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="calPartiBtn">
            <button
              type="button"
              class="cal-btn"
              id="plusCal"
              onClick={handlePlusCalClick}
            >
              <i class="bi bi-plus fs-5"></i>
            </button>
            <button
              type="button"
              class="cal-btn"
              id="minusCal"
              onClick={handleMinusCalClick}
            >
              <i class="bi bi-dash"></i>
            </button>
          </div>
          <div class="calPartiList">
            <table class="calPartiList-table">
              <thead class="calPartiList-head">
                <tr>
                  <th><input type="hidden" value="사원번호" /></th>
                  <th>부서</th>
                  <th>사원명</th>
                  <th>직급</th>
                  <th>이메일</th>
                </tr>
              </thead>
              <tbody id="calPartiList-body2">
                {addUsers.map((user, index) => (
                  <tr 
                    key={user.user_no}
                    onClick={() => handleRowClick2(index)}
                    className={selectedRows2.includes(index) ? 'selected-rows' : ''}
                  >
                    <td>
                      <input type="hidden" value={user.user_no} />
                    </td>
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
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleCloseModal}
          >
            취소
          </button>
          <button 
            type="button" 
            className="btn btn-primary ml-2" 
            id="cPartiOk" 
            onClick={handleCPartiOkClick}
          >
            선택
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default CalPartiModal;
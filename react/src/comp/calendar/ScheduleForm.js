import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';


const ScheduleForm = ({ user, show, handleClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>일정 등록</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          {/* 폼 내용 및 이벤트 핸들러 */}
          일정을 등록할 수 있도록,,,
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ScheduleForm;

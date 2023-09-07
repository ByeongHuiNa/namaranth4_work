import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const MyCalendar = ({events}) => {
    return(
        <div className='calendar-wrap'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{
              start: 'today,listWeek',
              center: 'prev,title,next',
              end: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            buttonText={{
              today: '오늘',
              listWeek: '일정목록',
              dayGridMonth: '월',
              timeGridWeek: '주',
              timeGridDay: '일',
            }}
            titleFormat={(date) =>
              date.date.year + '년 ' + (parseInt(date.date.month) + 1) + '월'
            }
            slotMinTime="08:00:00" 
            slotMaxTime="18:00:00"
            selectable={true}
            droppable={true}
            editable={true}
            nowIndicator={true}
            locale='ko'
            height={820}
            events={events} // 초기 데이터를 설정한 events 배열을 사용
            dayCellContent={(e) => {
              return e.dayNumberText.replace('일', '');
            }}
          />
    </div>
    );
}

export default MyCalendar;
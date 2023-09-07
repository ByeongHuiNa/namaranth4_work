import CalendarList from "../comp/calendar/CalendarList";
import { useState, useEffect } from "react";
import axios from "axios";
import MyCalendar from "../comp/calendar/MyCalendar";
import moment from "moment";


const CalendarPage = () => {
    const [calendarList, setCalendarList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [events, setEvents] = useState([]); 
    const [users, setUsers] = useState([]);
    
    const calendarListHandler = () =>{
      axios.get('/calendar/calendar').then((res)=>{
        //console.log(res.data);
        setCalendarList(res.data);
      });
    };

    useEffect(()=>{
        calendarListHandler();
    },[]);

    const showSchedule = async () => {
      try {
        const response = await axios.get('/calendar/showCalendars');
        const data = response.data;
        //console.log(data);
  
        const formattedEvents = data.map((item) => {
          if (item.sch_allday === 1) {
            return {
              cal_no: item.calendar.cal_no,
              title: item.sch_name,
              start: moment(item.sch_start).format('YYYY-MM-DD'),
              end: moment(item.sch_end).add(1, 'days').format('YYYY-MM-DD'),
              allDay: true,
              color: item.calendar.cal_color,
            };
          } else {
            return {
              cal_no: item.calendar.cal_no,
              title: item.sch_name,
              start: moment(item.sch_start).format('YYYY-MM-DDTHH:mm:ss'),
              end: moment(item.sch_end).format('YYYY-MM-DDTHH:mm:ss'),
              allDay: false,
              color: item.calendar.cal_color,
            };
          }
        });
    
        setEvents(formattedEvents);
        setEventList(formattedEvents);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        showSchedule();
      }, []);

      
      const scheduleHandler = (cal_no) => {
        //console.log(cal_no);
        const es = eventList.filter((schedule) => 
            schedule.cal_no === cal_no
        );
        setEvents(es);
        //console.log(es);

      }

    const usersHandler = () => {
        axios.get('/calendar/calPartiList').then((res) => {
            //console.log(res.data);
            setUsers(res.data);
        });
    }
    
    useEffect(()=>{
        usersHandler();
    },[]);
    


    return (
      <div className='wrapper'>
        <CalendarList 
            calendarList={calendarList}
            showSchedule={showSchedule} 
            scheduleHandler={scheduleHandler}
            users={users} 
            calendarListHandler={calendarListHandler}
        />
        <MyCalendar events={events}/>
      </div>
    );
  };
  
  export default CalendarPage;
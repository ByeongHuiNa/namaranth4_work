package org.namaranth.controller;

import org.namaranth.domain.*;
import org.namaranth.service.AttendanceService;
import org.namaranth.service.NoteService;
import org.namaranth.service.NoticeService;
import org.namaranth.service.UserServiceImpl;
import org.namaranth.vo.RequestLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/main")
public class MainController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private NoteService noteService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/info")
    public Map<String, Object> mainPage() {
        Map<String, Object> mainInfo = new HashMap<>();
        int user_no = 2;
        mainInfo.put("user", userService.getUserById(user_no));
        mainInfo.put("deptName", userService.getDept(userService.getUserById(user_no).getUser_email()));
        List<EmailVO> emails = userService.getEmails(user_no);
        mainInfo.put("emails", emails);
        List<DocumentVO> docs = userService.getDoc(user_no);
        mainInfo.put("docs", docs);
        List<NoticeVO> notices = noticeService.getNoticeList();
        mainInfo.put("notices", notices);
        List<NoteVO> notes = noteService.getList(user_no);
        mainInfo.put("notes", notes);
        List<ScheduleVO> schedules = userService.getSchedules(user_no);
        mainInfo.put("schedules", schedules);
        AttendVO attend = attendanceService.get(user_no);
        mainInfo.put("attend", attend);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        if (attend != null && attend.getStart_time() != null) {
            String startTime = formatter.format(attend.getStart_time());
            mainInfo.put("formattedStartTime", startTime);
        }
        if (attend != null && attend.getEnd_time() != null) {
            String endTime = formatter.format(attend.getEnd_time());
            mainInfo.put("formattedEndTime", endTime);
        }

        return mainInfo;
    }

    @GetMapping("/attend/{user_no}")
    public AttendVO attendance(@PathVariable("user_no") int user_no){
        return attendanceService.get(user_no);
    }

    @PostMapping("/attend/start/{user_no}")
    public ResponseEntity<String> startAttendance(
            @PathVariable("user_no") int user_no, @RequestParam long start_time
    ){
        Date at_start = new Date(start_time);
        Map<String, Object> params = new HashMap<>();
        params.put("user_no", user_no);
        params.put("start_time", at_start);

        if(attendanceService.isExistStart(params)){
            return new ResponseEntity<>("already success", HttpStatus.OK);
        }

        AttendVO vo = new AttendVO();
        vo.setUser(userService.getUserById(user_no));
        vo.setStart_time(at_start);

        attendanceService.updateStart(vo);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @PostMapping("attend/end/{user_no}")
    public ResponseEntity<String> endAttendance(
            @PathVariable("user_no") int user_no, @RequestParam long end_time, @RequestParam int at_no
    ) {
        if(!attendanceService.isExistStartToday(user_no)){
            return new ResponseEntity<>("no attend start", HttpStatus.OK);
        }

        if(attendanceService.isExistEndToday(user_no)){
            return new ResponseEntity<>("already success", HttpStatus.OK);
        }

        Date at_end = new Date(end_time);
        attendanceService.updateEnd(at_no, at_end);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("/search/users")
    public List<UsersVO> searchUsers(
            @RequestParam("user_name") String user_name){
        List<UsersVO> users = userService.getUserByName(user_name);
        return users;
    }

    @GetMapping("/notes/list/{user_no}")
    public List<NoteVO> noteList(@PathVariable("user_no") int user_no){
        return noteService.getList(user_no);
    }

    @PostMapping("/notes/new")
    public ResponseEntity<String> register(@RequestBody NoteVO vo){
        int result = noteService.register(vo);

        return result == 1 ? new ResponseEntity<String>("success", HttpStatus.OK)
                : new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/notes/update/{note_no}")
    public ResponseEntity<String> modify(@RequestBody NoteVO vo, @PathVariable("note_no") int note_no){
        return noteService.modify(vo) == 1 ?
                new ResponseEntity<String>("success", HttpStatus.OK) :
                new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/notes/delete/{note_no}")
    public ResponseEntity<String> remove(@PathVariable("note_no") int note_no){
        return noteService.remove(note_no) == 1 ?
                new ResponseEntity<String>("success", HttpStatus.OK) :
                new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

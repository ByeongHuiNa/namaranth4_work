package org.namaranth.controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import org.namaranth.domain.CalendarVO;
import org.namaranth.domain.RequestVO;
import org.namaranth.domain.ScheduleVO;
import org.namaranth.domain.UsersVO;
import org.namaranth.service.CalendarService;
import org.namaranth.service.ScheduleService;
import org.namaranth.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/calendar")
@AllArgsConstructor
public class CalendarController {

    private CalendarService service;
    private UserService uService;
    private ScheduleService sService;

    @GetMapping("/calendar")
    public List<CalendarVO> getAllCalendars() {
       return service.getList();
    }

    @GetMapping("/calPartiList")
    public List<UsersVO> getUserList(){
        return uService.getdeptUserList();
    }

	@GetMapping("/{cal_no}")
	public CalendarVO getCal(@PathVariable("cal_no") int cal_no) {
		return service.get(cal_no);
	}

    @GetMapping("/{cal_no}/calParti")
    public List<UsersVO> readUserFromCalParti(@PathVariable("cal_no") int cal_no) {
        List<UsersVO> calParti = null;
        try {
           calParti = service.readUserFromCalParti(cal_no);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return calParti;
    }


    @PostMapping("/register")
    public void registerCal(@RequestBody RequestVO requestVO) {
        //System.out.println(requestVO);
        CalendarVO cal = requestVO.getCalendarVO();
        List<Integer> calParti_no = requestVO.getCalParti_no();
        service.registerCal(cal, calParti_no);
    }

    @PutMapping ("/{cal_no}")
    public void updateCal(@RequestBody RequestVO requestVO) {
        //System.out.println(requestVO);
        CalendarVO cal = requestVO.getCalendarVO();
        List<Integer> calParti_no = requestVO.getCalParti_no();
        service.updateCal(cal, calParti_no);
    }


    @DeleteMapping("/delete/{cal_no}")
    public void deleteCal(@PathVariable("cal_no") int cal_no) {
        service.deleteCal(cal_no);
    }



//
//    //스케줄 등록
//    @PostMapping("/regiSch")
//    public String registerSch(ScheduleVO sch,
//                              @RequestParam("start") Long start, @RequestParam("end") Long end) {
//
//
//        Date startDate = new Date(start);
//        Date endDate = new Date(end);
//
//
//
//
//        sch.setSch_start(startDate);
//        sch.setSch_end(endDate);
//
//        sService.registerSch(sch);
//
//        return "redirect:/calendar/calendar";
//    }


}






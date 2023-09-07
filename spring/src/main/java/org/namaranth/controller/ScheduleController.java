package org.namaranth.controller;

import java.util.List;

import org.namaranth.domain.ScheduleVO;
import org.namaranth.service.CalendarService;
import org.namaranth.service.ScheduleService;
import org.namaranth.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/calendar")
@AllArgsConstructor
public class ScheduleController {

	private ScheduleService service;
	private UserService uService;
	private CalendarService cService;


//	@GetMapping("/getSchedule")
//	public ResponseEntity<List<ScheduleVO>> getSchedule(Principal principal){
//		String user_email = principal.getName();
//		UsersVO uVO = uService.getUser(user_email);
//		int user_no = uVO.getUser_no();
//		List<ScheduleVO> schedules = service.getSchedule(user_no);
//		return new ResponseEntity<>(schedules, HttpStatus.OK);
//	}
//


	@GetMapping("/showCalendars")
	public List<ScheduleVO> showAllCalendar(){
		return service.getSchedule();
	}





////	@GetMapping("/{cal_no}/userCalParti")
////    public ResponseEntity<List<CalendarVO>> readUserFromCalParti(@PathVariable("cal_no") int cal_no) {
////        List<CalendarVO> userCalParti = cService.readUserFromCalParti(cal_no);
////
////        return new ResponseEntity<>(userCalParti, HttpStatus.OK);
////    }
//

//
//
////	@GetMapping("/{cal_no}")
////    public ResponseEntity<CalendarVO> get(@PathVariable("cal_no") int cal_no,
////                                          @RequestParam(value = "userCalParti_no", required = false) List<Integer> userCalParti_no) {
////        // userCalParti_no가 null인 경우에 대한 처리
////        if (userCalParti_no == null) {
////            userCalParti_no = new ArrayList<>();
////        }
////
////        CalendarVO result = cService.get(cal_no, userCalParti_no);
////
////        return new ResponseEntity<>(result, HttpStatus.OK);
////    }

}

















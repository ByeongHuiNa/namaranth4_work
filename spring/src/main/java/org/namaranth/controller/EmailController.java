package org.namaranth.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.namaranth.domain.*;
import org.namaranth.service.EmailService;
import org.namaranth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

//@Log4j
@AllArgsConstructor
@RestController
public class EmailController {

    private EmailService service;

    private UserService userService;

//    @GetMapping("/allmail")
//    public List<EmailVO> allmail() {
//        System.out.println("요청......");
//        return service.getAll();
//    }
    //메일조회
    @GetMapping("/getmail/{mail_no}")
    public EmailResponseVO getmail(@PathVariable("mail_no") int mail_no) {
        System.out.println("get요청===========");
        //String user_email = principal.getName();

        //UsersVO VO = userService.getUser(user_email);
        //model.addAttribute("user", VO);

        //String deptName = userService.getDept(user_email);
        //model.addAttribute("dept", deptName);
        EmailVO email = service.get(mail_no);
        System.out.println("이메일 : " + email.toString());
        List<EmailVO> receivers = service.getReceiver(mail_no);
        EmailResponseVO response = new EmailResponseVO(email, receivers);
        System.out.println("이메일 : " + response.toString());
        return response;
        //model.addAttribute("getmail", service.get(mail_no));
        //model.addAttribute("getreceiver", service.getReceiver(mail_no));

        //log.info("/getmail: " + model);
    }

    //전체메일함
    @GetMapping("/allmail")
    public List<EmailVO> allmail(Principal principal) {
        //String user_email = principal.getName();

        //UsersVO VO = userService.getUser(user_email);
        //model.addAttribute("user", VO);

        //String deptName = userService.getDept(user_email);
        //model.addAttribute("dept", deptName);

        //log.info("allmail");

        List<EmailVO> sendMailList = service.getSendList(2); //발신메일함
        List<EmailVO> receiveMailList = service.getReceiveList(2); //수신메일함
        List<EmailVO> allMailList = new ArrayList<>(); //발신 + 수신 메일함

        allMailList.addAll(sendMailList);
        allMailList.addAll(receiveMailList);

        Collections.sort(allMailList, new SortAll());
        //model.addAttribute("allmail", allMailList);

        return allMailList;

        //log.info("allmail: " + model);
    }

    //보낸메일함
    @GetMapping("/sendmail")
    public List<EmailVO> sendmail(Principal principal) {
        //String user_email = principal.getName();

        //UsersVO VO = userService.getUser(user_email);
        //model.addAttribute("user", VO);

        //String deptName = userService.getDept(user_email);
        //model.addAttribute("dept", deptName);

        //log.info("sendmail");
        //model.addAttribute("allmail", service.getSendList(VO.getUser_no()));
        List<EmailVO> sendMailList = service.getSendList(2);
        System.out.println("리스트 : " + sendMailList);
        //log.info(model);
        return sendMailList;
    }

    //받은메일함
    @GetMapping("/receivemail")
    public List<EmailVO> receivemail(Principal principal) {
        //String user_email = principal.getName();

        //UsersVO VO = userService.getUser(user_email);


        //String deptName = userService.getDept(user_email);

        List<EmailVO> receiveMailList = service.getReceiveList(2); //수신메일함
        //log.info("sendmail");


        //log.info(model);
        return receiveMailList;
    }

    //휴지통
    @GetMapping("/delmail")
    public List<EmailVO> delmail(Principal principal) {
        //String user_email = principal.getName();

        //UsersVO VO = userService.getUser(user_email);


        //String deptName = userService.getDept(user_email);

        List<EmailVO> delList = service.getDelList(2);
        System.out.println(delList);
        return delList;
        //log.info(model);
    }
//
//
    //임시보관함
    @GetMapping("/tsmail")
    public List<EmailtsVO> tsmail(Principal principal) {
       // String user_email = principal.getName();

        //UsersVO VO = userService.getUser(user_email);


        //String deptName = userService.getDept(user_email);

        List<EmailtsVO> tsList = service.getTsList(2);
        System.out.println(tsList);
        return tsList;
        //model.addAttribute("tsmail", service.getTsList(VO.getUser_no()));

        //log.info(model);
    }
//

//
    //임시보관함 메일 조회
    @GetMapping("/gettsmail/{mailts_no}")
    public EmailtsVO gettsmail(@PathVariable("mailts_no") int mailts_no,  Principal principal) {
       // String user_email = principal.getName();

        //UsersVO VO = userService.getUser(user_email);


        //String deptName = userService.getDept(user_email);


        EmailtsVO emailtsVO = service.getts(mailts_no);
        System.out.println(emailtsVO);

        return emailtsVO;
    }
//
    //휴지통메일조회
    @GetMapping("/getdelmail")
    public void getdelmail(@RequestParam("mail_no") int mail_no, Model model, Principal principal) {
        String user_email = principal.getName();
        UsersVO VO = userService.getUserByEmail(user_email);
        model.addAttribute("user", VO);
        String deptName = userService.getDept(user_email);
        model.addAttribute("dept", deptName);

        //log.info("/getdelmail");
        model.addAttribute("getdelmail", service.get(mail_no));
        model.addAttribute("getreceiver", service.getReceiver(mail_no));
        //log.info("/getdelmail: " + model);
    }
//
//    //메일전송페이지
//    @GetMapping("/register")
//    public void register(Model model, Principal principal) {
//        String user_email = principal.getName();
//
//        UsersVO VO = userService.getUser(user_email);
//        model.addAttribute("user", VO);
//
//        String deptName = userService.getDept(user_email);
//        model.addAttribute("dept", deptName);
//
//
//    }
//
    // 메일전송
    @PostMapping("/register/{receiver_no}")
    public void registermail(@RequestBody EmailVO emailVO, @PathVariable Integer receiver_no/*, HttpServletRequest request*/) {
        //receiver_no = Integer.parseInt(String.valueOf(receiver_no));
//        EmailVO emailVO = registerWrapper.getEmailVO();
//        Integer receiver_no = registerWrapper.getReceiver_no();

        System.out.println("zz : " + emailVO);
        System.out.println("zz : " + receiver_no);
        //log.info("register : " + email);
//        try {
//            Integer mailts_no = Integer.parseInt(request.getParameter("mailts_no"));
//            System.out.println("임시메일번호: " + mailts_no);
//            //log.info("mailts_no: " +   mailts_no);
//            if(mailts_no != null) {
//                service.tsremove(mailts_no);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        System.out.println(emailVO);
        System.out.println(receiver_no);
        service.register(emailVO);
        service.registerUser(receiver_no);

    }
    // 메일전송
    @PostMapping("/register/{receiver_no}/{mailts_no}")
    public void registermail(@RequestBody EmailVO emailVO, @PathVariable Integer receiver_no, @PathVariable Integer mailts_no/*HttpServletRequest request*/) {
        //receiver_no = Integer.parseInt(String.valueOf(receiver_no));
//        EmailVO emailVO = registerWrapper.getEmailVO();
//        Integer receiver_no = registerWrapper.getReceiver_no();

        System.out.println("zz : " + emailVO);
        System.out.println("zz : " + receiver_no);
        //log.info("register : " + email);
        try {
            //Integer mailts_no = Integer.parseInt(request.getParameter("mailts_no"));
            System.out.println("임시메일번호: " + mailts_no);
            //log.info("mailts_no: " +   mailts_no);
            if(mailts_no != null) {
                service.tsremove(mailts_no);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(emailVO);
        System.out.println(receiver_no);
        service.register(emailVO);
        service.registerUser(receiver_no);

    }
    //
//
    //메일 임시저장
    @PostMapping("/tsregister")
    public void tsregistermail(@RequestBody EmailVO email) {
        System.out.println(email);

        //log.info("tsregister : " + email);

        service.tsregister(email);


    }
//
    //메일 휴지통으로 보내기(삭제)
    @PostMapping("/maildel")
    public void maildel(@RequestBody EmailVO email) {

        System.out.println("이메일ㅋ : "  + email);
        service.emailDel(email);


    }

    //휴지통 메일 복구
    @PostMapping("/mailrestore")
    public String mailrestore(@RequestBody Integer mail_no) {

        //log.info("mailrestore : " + mail_no);
        System.out.println("메일번호: " + mail_no);
        if (service.restore(mail_no)) {
            return "success"; // 성공한 경우 "success" 문자열 반환
        } else {
            return "failure"; // 실패한 경우 "failure" 문자열 반환
        }

//        if(service.restore(mail_no)) {
//            rttr.addFlashAttribute("result", "success");
//
    }
}


//정렬을위한 클래스
class SortAll implements Comparator<EmailVO> {
    @Override
    public int compare(EmailVO o1, EmailVO o2) {

        if(o1.getMail_no()>o2.getMail_no() ) {
            return -1;
        }else if(o1.getMail_no()<o2.getMail_no()) {
            return 1;
        }else
            return 0;
    }
}



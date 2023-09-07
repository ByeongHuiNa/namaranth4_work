package org.namaranth.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.java.Log;
import org.namaranth.domain.NoticeVO;
import org.namaranth.domain.UsersVO;
import org.namaranth.service.NoticeService;
import org.namaranth.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Log
@RequestMapping("/notice")
public class NoticeController {

    @Value("${token.secret}")
    private String user_token; // application.properties 또는 application.yml에서 설정한 시크릿 값 가져오기

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private UserServiceImpl userService;
    
    // 게시물 등록
    @GetMapping("/register")
    public UsersVO register(HttpServletRequest request) {
        String jwtToken = request.getHeader("Authorization").substring(7);

        // 토큰을 해석해서 클레임(Claims)을 얻습니다.
        Claims claims = Jwts.parser().setSigningKey(user_token).parseClaimsJws(jwtToken).getBody();

        int user_no = Integer.parseInt(claims.getSubject());
        System.out.println(user_no);
//        현재 로그인 한 사용자 정보와 부서 정보 전송
//        String user_email = principal.getName();
//        UsersVO users = userService.getUser(user_email);
//        model.addAttribute("user", users);
//        String deptName = userService.getDept(user_email);
//        model.addAttribute("dept", deptName);
        return userService.getUserById(1);
    }

    @PostMapping("/register")
    public void registerPost(@RequestBody NoticeVO vo) {
        noticeService.register(vo);
    }

    // 게시물 상세 조회
    @GetMapping("/get/{noti_no}")
    public Map<String, Object> get(@PathVariable("noti_no") int noti_no) {
//        현재 로그인 한 사용자 정보와 부서 정보 전송
//        String user_email = principal.getName();
//        UsersVO users = userService.getUser(user_email);
//        model.addAttribute("user", users);
//        String deptName = userService.getDept(user_email);
//        model.addAttribute("dept", deptName);
            Map<String, Object> notices = new HashMap<>();
            notices.put("user", userService.getUserById(1));
            notices.put("notice", noticeService.getNotice(noti_no));
           return notices;
    }

    // 게시물 목록 조회
    @GetMapping("/list")
    public List<NoticeVO> getList() {
//        페이징 처리 : 필요하면 사용하기
        // int total = noticeService.getNoticeTotal();
        // model.addAttribute("list", noticeService.getNoticeListPaging(cri));
        // model.addAttribute("pageMaker", new PageDTO(cri, total));

//        현재 로그인 한 사용자 정보와 부서 정보 전송        
//        String user_email = principal.getName();
//        UsersVO users = userService.getUser(user_email);
//        model.addAttribute("user", users);
//        String deptName = userService.getDept(user_email);
//        model.addAttribute("dept", deptName);
        return noticeService.getNoticeList();
    }

    // 게시물 수정
    @GetMapping("/modify/{noti_no}")
    public Map<String, Object> modify(@PathVariable("noti_no") int noti_no) {
//        현재 로그인 한 사용자 정보와 부서 정보 전송
//        String user_email = principal.getName();
//        UsersVO users = userService.getUser(user_email);
//        model.addAttribute("user", users);
//        String deptName = userService.getDept(user_email);
//        model.addAttribute("dept", deptName);
        int user_no = 5;

        Map<String, Object> notices = new HashMap<>();
        notices.put("user", userService.getUserById(user_no));
        notices.put("notice", noticeService.getNotice(noti_no));
        return notices;
    }

    @PutMapping("/modify/{noti_no}")
    public void modifyPost(@PathVariable("noti_no") int noti_no, @RequestBody NoticeVO vo) {
        noticeService.modify(vo);
    }

    // 게시물 삭제
    @PostMapping("/remove/{noti_no}")
    public void remove(@PathVariable("noti_no") int noti_no) {
        noticeService.remove(noti_no);
    }
}

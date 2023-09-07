package org.namaranth.controller;

import org.namaranth.domain.DocumentVO;
import org.namaranth.domain.UsersVO;
import org.namaranth.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DocumentController {

    @Autowired
    DocumentService service;

    @GetMapping("/docboard")
    public List<DocumentVO> allList(){
        return service.getList();
    }

    @GetMapping("/docboard/{id}")
    public DocumentVO getDocument(@PathVariable int id){
        return service.getDocument(id);
    }

    @GetMapping("/docboard/{id}/ref")
    public List<UsersVO> getDocumentRef(@PathVariable int id){
        return service.getDocRefList(id);
    }

    @GetMapping("/docboard/{id}/first-app")
    public UsersVO getDocumentFirstAppUser(@PathVariable int id){
        return service.getDocFirstApp(id);
    }

    @GetMapping("/docboard/{id}/second-app")
    public UsersVO getDocumentSecondAppUser(@PathVariable int id){
        return service.getDocSecondApp(id);
    }
    @GetMapping("/docboard/{id}/get-app-list")
    public List<Integer> getDocumentAppCheck(@PathVariable int id){
        return service.getAppCheck(id);
    }

    @GetMapping("/docboard/{id}/get-rej-list")
    public List<Integer> getDocumentRejCheck(@PathVariable int id){
        return service.getRejCheck(id);
    }

    @GetMapping("/docboard/{id}/get-rej-content")
    public String getDocumentRejContent(@PathVariable int id){
        return service.getRejContent(id);
    }

    @PostMapping("/docboard/{id}/post-ref-list")
    public void addDocumentRefList(@PathVariable int id, @RequestBody List<UsersVO> users){
        System.out.println(id);
        System.out.println(users);
        service.addRefUser(id, users);
    }
}

package org.namaranth.domain;

import java.util.Collection;
import java.util.stream.Collectors;

import lombok.Getter;

//@Getter
//public class CustomUser extends User{
//	private static final long serialVersionUID = 1;
//	private UsersVO user;
//
//	public CustomUser(String username, String password,
//			Collection<? extends GrantedAuthority> authorities) {
//		super(username, password, authorities);
//	}
//
//	public CustomUser(UsersVO vo) {
//		super(vo.getUser_email(), vo.getUser_pwd(),
//				vo.getAuthList().stream()
//					.map(auth -> new SimpleGrantedAuthority(auth.getAuth()))
//					.collect(Collectors.toList()));
//		this.user = vo;
//	}
//}

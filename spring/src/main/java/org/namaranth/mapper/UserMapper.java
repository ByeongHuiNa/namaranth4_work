package org.namaranth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.namaranth.domain.UsersVO;

import java.util.List;

@Mapper
public interface UserMapper {
    public List<UsersVO> listUser();
}

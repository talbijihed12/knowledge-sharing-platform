package com.communication.plateforme.services;


import com.communication.plateforme.model.Role;
import com.communication.plateforme.model.enums.RoleEnum;
import java.util.List;

public interface IRoleService {
    Role addRole(RoleEnum roleEnum);

    boolean roleExist(RoleEnum roleEnum);
    List<Role> listRole();
    List<Role> listRoleByRoleEnumsList(List<RoleEnum> roleEnums);
    Role findRoleByRoleEnum(RoleEnum roleEnum);

}

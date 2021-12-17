package com.communication.plateforme.services;

import com.communication.plateforme.model.User;
import com.communication.plateforme.utils.payload.request.UpdateUserRequest;

import java.util.List;

public interface IUserService {

    /*User updateExistUser(UpdateUserRequest user);

    User submitUserToDb(UserRequest user, User user1);

    void deleteUser(Long id);*/

    List<User> listUser();
    void deleteUser(Long id);

    void resetPassword(String email,String password);

    void updateUser(UpdateUserRequest updateUserRequest);
    User findUserByUsername(String username);
}

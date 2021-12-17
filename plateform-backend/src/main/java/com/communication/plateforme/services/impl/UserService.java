package com.communication.plateforme.services.impl;

import com.communication.plateforme.model.Role;
import com.communication.plateforme.model.User;
import com.communication.plateforme.repositry.UserRepository;
import com.communication.plateforme.services.IRoleService;
import com.communication.plateforme.services.IUserService;
import com.communication.plateforme.utils.exceptions.NotFoundException;
import com.communication.plateforme.utils.exceptions.SpringPlateformeException;
import com.communication.plateforme.utils.payload.request.UpdateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    IRoleService roleService;

    @Override
    public List<User> listUser() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        if (userRepository.existsById(id))
            userRepository.deleteById(id);
        else {
            throw new NotFoundException("User with id: " + id + " not found");
        }
    }

    @Override
    public void resetPassword(String email, String password) {

    }

    @Override
    public void updateUser(UpdateUserRequest updateUserRequest) {
        User user = this.findUserByUsername(updateUserRequest.getUsername());
        List<Role> roles = this.roleService.listRoleByRoleEnumsList(updateUserRequest.getRoles());
        user.setRoles(new HashSet<>(roles));
        this.userRepository.save(user);

    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new SpringPlateformeException("user not found with name -" + username));

    }
}

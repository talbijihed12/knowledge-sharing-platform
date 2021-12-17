package com.communication.plateforme.services.impl;

import com.communication.plateforme.model.*;
import com.communication.plateforme.services.IAuthService;
import com.communication.plateforme.utils.exceptions.NotFoundException;
import com.communication.plateforme.utils.exceptions.SpringPlateformeException;
import com.communication.plateforme.utils.exceptions.SubplateformeNotFoundException;
import com.communication.plateforme.utils.mapper.PostMapper;
import com.communication.plateforme.repositry.PostRepository;
import com.communication.plateforme.repositry.SubPlateformeRepository;
import com.communication.plateforme.repositry.UserRepository;
import com.communication.plateforme.utils.transferObject.PostRequest;
import com.communication.plateforme.utils.transferObject.PostResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
@Transactional
public class PostService {
    @Autowired
    private SubPlateformeRepository subPlateformeRepository;
    @Autowired
    private IAuthService authService;
    @Autowired
    private  PostMapper postMapper;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private  UserRepository userRepositry;


    public void save(PostRequest postRequest) {
        Subplateforme subplateforme = subPlateformeRepository.findByName(postRequest.getSubplateformeName())
                .orElseThrow(() -> new SubplateformeNotFoundException(postRequest.getSubplateformeName()));
        postRepository.save(postMapper.map(postRequest, subplateforme, authService.getCurrentUser()));

    }

    @Transactional(readOnly = true)
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(id.toString()));
        return postMapper.mapToTO(post);

    }

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(postMapper::mapToTO)
                .collect(toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsBySubplateforme(Long subplateformeId) {
        Subplateforme subplateforme = subPlateformeRepository.findById(subplateformeId)
                .orElseThrow(() -> new SubplateformeNotFoundException(subplateformeId.toString()));
        List<Post> posts = postRepository.findAllBySubplateforme(subplateforme);
        return posts
                .stream()
                .map(postMapper::mapToTO)
                .collect(toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsByUsername(String username) {
        User user = userRepositry.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return postRepository.findByUser(user)
                .stream()
                .map(postMapper::mapToTO)
                .collect(toList());
    }

    public void deletePost(Long id){
        Post post = this.postRepository.findById(id).orElseThrow(() -> new SpringPlateformeException("post not found with id -" + id));
        this.postRepository.delete(post);

    }
}

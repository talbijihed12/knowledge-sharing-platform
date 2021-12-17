package com.communication.plateforme.controller;

import com.communication.plateforme.repositry.PostRepository;
import com.communication.plateforme.services.impl.PostService;
import com.communication.plateforme.utils.payload.response.MessageResponse;
import com.communication.plateforme.utils.transferObject.PostRequest;
import com.communication.plateforme.utils.transferObject.PostResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/posts/")
@AllArgsConstructor

public class PostController {
    private final PostService postService;
    @Autowired
    PostRepository postRepository;


    @PostMapping
    public ResponseEntity createPost(@RequestBody PostRequest postRequest) {
        postService.save(postRequest);
        return new ResponseEntity(HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return status(HttpStatus.OK).body(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        return status(HttpStatus.OK).body(postService.getPost(id));
    }

    @GetMapping("by-subplateforme/{id}")
    public ResponseEntity<List<PostResponse>> getPostsBySubplateforme(@PathVariable Long id) {
        return status(HttpStatus.OK).body(postService.getPostsBySubplateforme(id));

    }

    @GetMapping("by-user/{name}")
    public ResponseEntity<List<PostResponse>> getPostsByUsername(@PathVariable String name) {
        return status(HttpStatus.OK).body(postService.getPostsByUsername(name));

    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok(new MessageResponse("Post deleted successfully!"));
    }

}

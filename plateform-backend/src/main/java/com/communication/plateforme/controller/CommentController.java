package com.communication.plateforme.controller;

import com.communication.plateforme.services.impl.CommentService;
import com.communication.plateforme.utils.payload.response.MessageResponse;
import com.communication.plateforme.utils.transferObject.CommentTO;
import com.communication.plateforme.utils.transferObject.PostResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/api/comments/")
@AllArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Void> createComment(@RequestBody CommentTO commentTO) {
        commentService.save(commentTO);
        return new ResponseEntity<>(CREATED);

    }
    @GetMapping("{idComment}")
    public ResponseEntity<CommentTO> getComment(@PathVariable Long idComment) {
        return status(HttpStatus.OK).body(commentService.getComment(idComment));
    }


    @GetMapping("/by-post/{postId}")
    public ResponseEntity<List<CommentTO>> getAllCommentsForPost(@PathVariable Long postId) {
        return ResponseEntity.status(OK).body(commentService.getAllCommentsForPost(postId));

    }

    @GetMapping("/by-user/{userName}")
    public ResponseEntity<List<CommentTO>> getAllCommentsForUser(@PathVariable String userName) {
        return ResponseEntity.status(OK).body(commentService.getAllCommentsForUser(userName));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok(new MessageResponse("Comment deleted successfully!"));
    }
}

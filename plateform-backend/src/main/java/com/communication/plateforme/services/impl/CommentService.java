package com.communication.plateforme.services.impl;

import com.communication.plateforme.model.*;
import com.communication.plateforme.services.IAuthService;
import com.communication.plateforme.utils.exceptions.NotFoundException;
import com.communication.plateforme.utils.exceptions.SpringPlateformeException;
import com.communication.plateforme.utils.mapper.CommentMapper;
import com.communication.plateforme.repositry.CommentRepository;
import com.communication.plateforme.repositry.PostRepository;
import com.communication.plateforme.repositry.UserRepository;
import com.communication.plateforme.utils.transferObject.CommentTO;
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
public class CommentService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private  UserRepository userRepositry;
    @Autowired
    private IAuthService authService;
    @Autowired
    private  CommentMapper commentMapper;
    @Autowired
    private CommentRepository commentRepositry;
    @Autowired
    private  MailContentBuilder mailContentBuilder;
    @Autowired
    private  MailService mailService;



    public void save(CommentTO commentTO) {
        Post post = postRepository.findById(commentTO.getPostId())
                .orElseThrow(() -> new NotFoundException(commentTO.getPostId().toString()));
        Comment comment = commentMapper.map(commentTO, post, authService.getCurrentUser());
        commentRepositry.save(comment);
        String message = mailContentBuilder.build(post.getUser().getUsername() + " posted a comment on your post. ");
        sendCommentNotification(message, post.getUser());

    }

    public CommentTO getComment(Long idComment) {
        Comment comment = commentRepositry.findById(idComment)
                .orElseThrow(() -> new NotFoundException(idComment.toString()));
        return commentMapper.mapToTO(comment);

    }

    private void sendCommentNotification(String message, User user) {
        mailService.sendMail(new NotificationEmail(user.getUsername() + " Commented on your post ", user.getEmail(), message));

    }

    public List<CommentTO> getAllCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(postId.toString()));
        return commentRepositry.findByPost(post)
                .stream()
                .map(commentMapper::mapToTO)
                .collect(toList());
    }

    public List<CommentTO> getAllCommentsForUser(String userName) {
        User user = userRepositry.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));
        return commentRepositry.findAllByUser(user)
                .stream()
                .map(commentMapper::mapToTO)
                .collect(toList());
    }
    public void deleteComment(Long id){
        Comment comment = this.commentRepositry.findById(id).orElseThrow(() -> new SpringPlateformeException("comment not found with id -" + id));

        this.commentRepositry.delete(comment);

    }
}

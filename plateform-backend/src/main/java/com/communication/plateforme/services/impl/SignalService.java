package com.communication.plateforme.services.impl;

import com.communication.plateforme.services.IAuthService;
import com.communication.plateforme.utils.exceptions.NotFoundException;
import com.communication.plateforme.utils.exceptions.SpringPlateformeException;
import com.communication.plateforme.repositry.CommentRepository;
import com.communication.plateforme.repositry.PostRepository;
import com.communication.plateforme.repositry.SignalRepository;
import com.communication.plateforme.utils.transferObject.SignalTO;
import com.communication.plateforme.model.Comment;
import com.communication.plateforme.model.Post;
import com.communication.plateforme.model.Signals;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.communication.plateforme.model.enums.SignalType.UPSIGNAL;

@Service
@Slf4j
public class SignalService {
    @Autowired
    private SignalRepository signalRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepositry;
    @Autowired
    private IAuthService authService;


    @Transactional
    public void signaler(SignalTO signalTO) {
        Post post = postRepository.findById(signalTO.getPostId())
                .orElseThrow(() -> new NotFoundException("Post not found with ID : " + signalTO.getPostId()));
        Optional<Signals> signalByPostAndUser = signalRepository.findTopByPostAndUserOrderBySignalIdDesc(post, authService.getCurrentUser());
       System.out.println("*************************");
       
        if (signalByPostAndUser.isPresent() && signalByPostAndUser.get().getSignalType().equals(signalTO.getSignalType())) {
            throw new SpringPlateformeException(" you have already " + signalTO.getSignalType() + "D this Post");
        }
        if (UPSIGNAL.equals(signalTO.getSignalType())) {
            post.setSignalCount(post.getSignalCount() + 1);
        }
        signalRepository.save(mapToSignal(signalTO, post));
        postRepository.save(post);
    }

    private Signals mapToSignal(SignalTO signalTO, Post post) {
        return Signals.builder()
                .signalType(signalTO.getSignalType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
    }

    @Transactional
    public void signalerComment(SignalTO signalTO) {
        Comment comment = commentRepositry.findById(signalTO.getIdComment())
                .orElseThrow(() -> new NotFoundException("Comment not found with ID : " + signalTO.getIdComment()));
        Optional<Signals> signalByCommentAndUser = signalRepository.findTopByCommentAndUserOrderBySignalIdDesc(comment, authService.getCurrentUser());
        if (signalByCommentAndUser.isPresent() && signalByCommentAndUser.get().getSignalType().equals(signalTO.getSignalType())) {
            throw new SpringPlateformeException(" you have already " + signalTO.getSignalType() + "D this Comment");
        }
        if (UPSIGNAL.equals(signalTO.getSignalType())) {
            comment.setSignalCount(comment.getSignalCount() + 1);
        }
        signalRepository.save(mapToSignalComment(signalTO, comment));
        commentRepositry.save(comment);
    }

    private Signals mapToSignalComment(SignalTO signalTO, Comment comment) {
        return Signals.builder()
                .signalType(signalTO.getSignalType())
                .comment(comment)
                .user(authService.getCurrentUser())
                .build();
    }

}

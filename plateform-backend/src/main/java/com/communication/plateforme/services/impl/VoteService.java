package com.communication.plateforme.services.impl;

import com.communication.plateforme.services.IAuthService;
import com.communication.plateforme.utils.exceptions.NotFoundException;
import com.communication.plateforme.utils.exceptions.SpringPlateformeException;
import com.communication.plateforme.repositry.CommentRepository;
import com.communication.plateforme.repositry.PostRepository;
import com.communication.plateforme.repositry.VoteRepository;
import com.communication.plateforme.utils.transferObject.VoteTO;
import com.communication.plateforme.model.Comment;
import com.communication.plateforme.model.Post;
import com.communication.plateforme.model.Vote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.communication.plateforme.model.enums.VoteType.UPVOTE;

@Service
public class VoteService {
    @Autowired
    private VoteRepository voteRepositry;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepositry;
    @Autowired
    private IAuthService authService;

    @Transactional
    public void vote(VoteTO voteTO) {
        Post post = postRepository.findById(voteTO.getPostId())
                .orElseThrow(() -> new NotFoundException("Post not found with ID: " + voteTO.getPostId()));
        Optional<Vote> voteByPostAndUser = voteRepositry.findTopByPostAndUserOrderByVoteIdDesc(post, authService.getCurrentUser());
        if (voteByPostAndUser.isPresent() && voteByPostAndUser.get().getVotetype().equals(voteTO.getVoteType())) {
            throw new SpringPlateformeException("you have already " + voteTO.getVoteType() + "D for this post");

        }
        if (UPVOTE.equals(voteTO.getVoteType())) {
            post.setVoteCount(post.getVoteCount() + 1);
        } else {
            post.setVoteCount(post.getVoteCount() - 1);
        }
        voteRepositry.save(mapToVote(voteTO, post));
        postRepository.save(post);
    }

    private Vote mapToVote(VoteTO voteTO, Post post) {
        return Vote.builder()
                .votetype(voteTO.getVoteType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
    }


    @Transactional
    public void voteComment(VoteTO voteTO) {
        Comment comment = commentRepositry.findById(voteTO.getIdComment())
                .orElseThrow(() -> new NotFoundException("Comment not found with ID:" + voteTO.getIdComment()));
        Optional<Vote> voteByCommentAndUser = voteRepositry.findTopByCommentAndUserOrderByVoteIdDesc(comment, authService.getCurrentUser());
        if (voteByCommentAndUser.isPresent() && voteByCommentAndUser.get().getVotetype().equals(voteTO.getVoteType())) {
            throw new SpringPlateformeException("you have already" + voteTO.getVoteType() + "D for this Comment");

        }
        if (UPVOTE.equals(voteTO.getVoteType())) {
            comment.setVoteCount(comment.getVoteCount() + 1);
        } else {
            comment.setVoteCount(comment.getVoteCount() - 1);
        }
        voteRepositry.save(mapToVoteComment(voteTO, comment));
        commentRepositry.save(comment);
    }

    private Vote mapToVoteComment(VoteTO voteTO, Comment comment) {
        return Vote.builder()
                .votetype(voteTO.getVoteType())
                .comment(comment)
                .user(authService.getCurrentUser())
                .build();
    }

}
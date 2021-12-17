package com.communication.plateforme.utils.mapper;

import com.communication.plateforme.model.*;
import com.communication.plateforme.model.enums.SignalType;
import com.communication.plateforme.model.enums.VoteType;
import com.communication.plateforme.repositry.CommentRepository;
import com.communication.plateforme.repositry.SignalRepository;
import com.communication.plateforme.repositry.VoteRepository;
import com.communication.plateforme.services.impl.AuthService;
import com.communication.plateforme.utils.transferObject.CommentTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static com.communication.plateforme.model.enums.SignalType.UPSIGNAL;
import static com.communication.plateforme.model.enums.VoteType.DOWNVOTE;
import static com.communication.plateforme.model.enums.VoteType.UPVOTE;

@Mapper(componentModel = "spring")
public abstract class CommentMapper {
    @Autowired
    private VoteRepository voteRepositry;
    @Autowired
    private CommentRepository commentRepositry;
    @Autowired
    private AuthService authService;
    @Autowired
    private SignalRepository signalRepository;

    @Mapping(target = "idComment", ignore = true)
    @Mapping(target = "text", source = "commentTO.text")
    @Mapping(target = "post", source = "post")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "voteCount", constant = "0")
    @Mapping(target = "signalCount", constant = "0")
    @Mapping(target = "createdBy" ,ignore = true)
    @Mapping(target = "createdDate" ,ignore = true)
    @Mapping(target = "lastModifiedBy" ,ignore = true)
    @Mapping(target = "lastModifiedDate" ,ignore = true)
    public abstract Comment map(CommentTO commentTO, Post post, User user);


    @Mapping(target = "postId", expression = "java(comment.getPost().getPubId())")
    @Mapping(target = "username", expression = "java(comment.getUser().getUsername())")
    @Mapping(target = "voteCount", source = "voteCount")
    @Mapping(target = "upVote", expression = "java(isCommentUpVoted(comment))")
    @Mapping(target = "downVote", expression = "java(isCommentDownVoted(comment))")
    @Mapping(target = "upSignal", expression = "java(isCommentUpSignal(comment))")
    public abstract CommentTO mapToTO(Comment comment);

    boolean isCommentUpVoted(Comment comment) {
        return checkVoteType(comment, UPVOTE);
    }

    boolean isCommentDownVoted(Comment comment) {
        return checkVoteType(comment, DOWNVOTE);
    }
    boolean isCommentUpSignal(Comment comment) {
        return checkSignalType(comment, UPSIGNAL);
    }
    private boolean checkVoteType(Comment comment, VoteType voteType) {
        if (authService.isLoggedIn()) {
            Optional<Vote> voteForCommentByUser =
                    voteRepositry.findTopByCommentAndUserOrderByVoteIdDesc(comment,
                            authService.getCurrentUser());
            return voteForCommentByUser.filter(vote -> vote.getVotetype().equals(voteType))
                    .isPresent();
        }
        return false;
    }
    private boolean checkSignalType(Comment comment, SignalType signalType) {
        if (authService.isLoggedIn()) {
            Optional<Signals> signalForCommentByUser =
                    signalRepository.findTopByCommentAndUserOrderBySignalIdDesc(comment,
                            authService.getCurrentUser());
            return signalForCommentByUser.filter(signal -> signal.getSignalType().equals(signalType))
                    .isPresent();
        }
        return false;
    }

}

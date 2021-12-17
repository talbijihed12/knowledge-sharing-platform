package com.communication.plateforme.utils.mapper;

import com.communication.plateforme.model.enums.SignalType;
import com.communication.plateforme.model.enums.VoteType;
import com.communication.plateforme.repositry.CommentRepository;
import com.communication.plateforme.repositry.SignalRepository;
import com.communication.plateforme.repositry.VoteRepository;
import com.communication.plateforme.services.IAuthService;
import com.communication.plateforme.utils.transferObject.PostRequest;
import com.communication.plateforme.utils.transferObject.PostResponse;
import com.communication.plateforme.model.*;
import com.github.marlonlom.utilities.timeago.TimeAgo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.communication.plateforme.model.enums.SignalType.UPSIGNAL;
import static com.communication.plateforme.model.enums.VoteType.DOWNVOTE;
import static com.communication.plateforme.model.enums.VoteType.UPVOTE;


@Mapper(componentModel = "spring")
public abstract class PostMapper {

    @Autowired
    private CommentRepository commentRepositry;
    @Autowired
    private VoteRepository voteRepositry;
    @Autowired
    private IAuthService authService;
    @Autowired
    private SignalRepository signalRepository;

    @Mapping(target = "subplateforme", source = "subplateforme")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "description", source = "postRequest.description")
    @Mapping(target = "voteCount", constant = "0")
    @Mapping(target = "signalCount", constant = "0")
    @Mapping(target = "createdBy" ,ignore = true)
    @Mapping(target = "createdDate" ,ignore = true)
    @Mapping(target = "lastModifiedBy" ,ignore = true)
    @Mapping(target = "lastModifiedDate" ,ignore = true)

    public abstract Post map(PostRequest postRequest, Subplateforme subplateforme, User user);

    @Mapping(target = "id", source = "pubId")
    @Mapping(target = "postName", source = "postName")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "hashTag", source = "hashTag")
    @Mapping(target = "subplateformeName", source = "subplateforme.name")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "commentCount", expression = "java(commentCount(post))")
    @Mapping(target = "duration", expression = "java(getDuration(post))")
    @Mapping(target = "upVote", expression = "java(isPostUpVoted(post))")
    @Mapping(target = "downVote", expression = "java(isPostDownVoted(post))")
    @Mapping(target = "upSignal", expression = "java(isPostUpSignal(post))")
    public abstract PostResponse mapToTO(Post post);

    Integer commentCount(Post post) {
        return commentRepositry.findByPost(post).size();
    }

    String getDuration(Post post) {
        return TimeAgo.using(Timestamp.valueOf(post.getCreatedDate()).getTime());
    }

    boolean isPostUpVoted(Post post) {
        return checkVoteType(post, UPVOTE);
    }

    boolean isPostDownVoted(Post post) {
        return checkVoteType(post, DOWNVOTE);
    }
    boolean isPostUpSignal(Post post) {
        return checkSignalType(post, UPSIGNAL);
    }

    private boolean checkVoteType(Post post, VoteType voteType) {
        if (authService.isLoggedIn()) {
            Optional<Vote> voteForPostByUser =
                    voteRepositry.findTopByPostAndUserOrderByVoteIdDesc(post,
                            authService.getCurrentUser());
            return voteForPostByUser.filter(vote -> vote.getVotetype().equals(voteType))
                    .isPresent();
        }
        return false;
    }
    private boolean checkSignalType(Post post, SignalType signalType) {
        if (authService.isLoggedIn()) {
            Optional<Signals> signalForPostByUser =
                    signalRepository.findTopByPostAndUserOrderBySignalIdDesc(post,
                            authService.getCurrentUser());
            return signalForPostByUser.filter(signal -> signal.getSignalType().equals(signalType))
                    .isPresent();
        }
        return false;
    }

}

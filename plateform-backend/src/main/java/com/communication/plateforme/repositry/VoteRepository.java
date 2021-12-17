package com.communication.plateforme.repositry;

import com.communication.plateforme.model.Comment;
import com.communication.plateforme.model.Post;
import com.communication.plateforme.model.User;
import com.communication.plateforme.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findTopByPostAndUserOrderByVoteIdDesc(Post post, User currentUser);

    Optional<Vote> findTopByCommentAndUserOrderByVoteIdDesc(Comment comment, User currentUser);
}

package com.communication.plateforme.repositry;

import com.communication.plateforme.model.Comment;
import com.communication.plateforme.model.Post;
import com.communication.plateforme.model.Signals;
import com.communication.plateforme.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignalRepository extends JpaRepository<Signals, Long> {
    Optional<Signals> findTopByPostAndUserOrderBySignalIdDesc(Post post, User currentUser);

    Optional<Signals> findTopByCommentAndUserOrderBySignalIdDesc(Comment comment, User currentUser);
}

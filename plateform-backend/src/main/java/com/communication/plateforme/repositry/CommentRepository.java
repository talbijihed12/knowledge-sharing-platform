package com.communication.plateforme.repositry;

import com.communication.plateforme.model.Comment;
import com.communication.plateforme.model.Post;
import com.communication.plateforme.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);

    List<Comment> findAllByUser(User user);
}

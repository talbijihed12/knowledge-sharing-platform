package com.communication.plateforme.repositry;

import com.communication.plateforme.model.Post;
import com.communication.plateforme.model.Subplateforme;
import com.communication.plateforme.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllBySubplateforme(Subplateforme subplateforme);

    List<Post> findByUser(User user);


    List<Post> findByPostName(String postName);
}

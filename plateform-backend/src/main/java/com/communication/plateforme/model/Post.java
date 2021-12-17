package com.communication.plateforme.model;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "publication")
public class Post extends Auditable<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pubId;
    @NotBlank(message = "Post Name cannot be empty or null")
    private String postName;
    @Nullable
    private String hashTag;
    @Nullable
    @Lob
    private String description;
    private int voteCount = 0;
    private int signalCount = 0;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;
    @ManyToOne
    @JoinColumn(name = "id", referencedColumnName = "id")
    private Subplateforme subplateforme;

}

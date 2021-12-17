package com.communication.plateforme.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Subplateforme extends Auditable<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "community name is required")
    private String name;
    @NotBlank(message = "description is required")
    private String description;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Post> posts;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}

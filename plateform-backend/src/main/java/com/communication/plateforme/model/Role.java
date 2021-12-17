package com.communication.plateforme.model;

import com.communication.plateforme.model.enums.RoleEnum;
import lombok.*;

import javax.persistence.*;


@Data
@Entity
@Table(name = "roles")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleEnum name;
}

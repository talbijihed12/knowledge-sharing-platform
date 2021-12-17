package com.communication.plateforme.utils.transferObject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubplateformeTO {
    private long id;
    private String name;
    private String description;
    private Integer numberOfPosts;

}

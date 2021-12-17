package com.communication.plateforme.utils.transferObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest  {
    private Long postId;
    private String subplateformeName;
    private String postName;
    private String hashtag;
    private String description;

}

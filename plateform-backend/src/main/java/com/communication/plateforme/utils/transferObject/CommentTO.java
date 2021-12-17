package com.communication.plateforme.utils.transferObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentTO {
    private Long idComment;
    private Long postId;
    private LocalDateTime createDate;
    private String text;
    private String username;
    private Integer voteCount;
    private Integer signalCount;
    private boolean upVote;
    private boolean downVote;
    private boolean upSignal;

}

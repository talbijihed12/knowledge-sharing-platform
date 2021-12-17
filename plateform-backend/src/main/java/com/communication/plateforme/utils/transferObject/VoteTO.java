package com.communication.plateforme.utils.transferObject;

import com.communication.plateforme.model.enums.VoteType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteTO {
    private VoteType voteType;
    private Long postId;
    private Long idComment;
}

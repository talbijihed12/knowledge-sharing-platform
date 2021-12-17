package com.communication.plateforme.utils.transferObject;

import com.communication.plateforme.utils.payload.request.AuditableResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse extends AuditableResponse<String> {
    private Long id;
    private String postName;
    private String description;
    private String hashTag;
    private String username;
    private String subplateformeName;
    private int voteCount;
    private Integer commentCount;
    private String duration;
    private Integer signalCount;
    private boolean upVote;
    private boolean downVote;
    private boolean upSignal;





}

package com.communication.plateforme.utils.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuditableResponse<U> {
        private U createdBy;


        @JsonDeserialize(using = LocalDateDeserializer.class)
        @JsonFormat(pattern="dd/MM/yyyy hh:mm")
        private LocalDateTime createdDate;

        private U lastModifiedBy;

        @JsonDeserialize(using = LocalDateDeserializer.class)
        @JsonFormat(pattern="dd/MM/yyyy hh:mm")
        private LocalDateTime lastModifiedDate;
    }

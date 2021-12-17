package com.communication.plateforme.utils.transferObject;

import com.communication.plateforme.model.enums.SignalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignalTO {
    private SignalType signalType;
    private Long postId;
    private Long idComment;

}

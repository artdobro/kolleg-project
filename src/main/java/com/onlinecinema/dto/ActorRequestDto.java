package com.onlinecinema.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ActorRequestDto {

    private String actorName;
    private String actorSurName;
}

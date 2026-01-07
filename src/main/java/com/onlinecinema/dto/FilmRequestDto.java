package com.onlinecinema.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor


public class FilmRequestDto {

    private String filmName;
    private String filmYear;
    private Short genreId;
    private Short countryId;
    private String filmDescription;
    private String duration;
    private String poster;
    private String filmPath;
}

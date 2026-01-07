package com.onlinecinema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "film")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "film_id")
    private int filmId;

    @Column(name = "film_name")
    private String filmName;

    @Column(name = "film_year", nullable = false)
    private String filmYear;

    @Column(name = "genre_id")
    private Short genreId;

    @Column(name = "country_id")
    private Short countryId;

    @Column(name = "film_description", columnDefinition = "TEXT")
    private String filmDescription;

    @Column(name = "duration", nullable = false)
    private String duration;

    @Column(name = "poster")
    private String poster;

    @Column(name = "film_path")
    private String filmPath;
}

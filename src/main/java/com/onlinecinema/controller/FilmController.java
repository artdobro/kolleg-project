package com.onlinecinema.controller;

import com.onlinecinema.dto.FilmRequestDto;
import com.onlinecinema.entity.Film;
import com.onlinecinema.service.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/films")
public class FilmController {

    @Autowired
    private FilmService filmService;

    @PostMapping("/add")
    public Film createFilm(@RequestBody FilmRequestDto dto) {
        return filmService.createFilm(dto);
    }

    @GetMapping("/all")
    public List<Film> getAllFilms() {
        return filmService.getAllFilms();
    }

    @GetMapping("/film/{filmId}")
    public Film getFilmById(@PathVariable int filmId) {
        return filmService.getFilmById(filmId);
    }

    @PutMapping("/update/{filmId}")
    public Film updateFilm(@RequestBody FilmRequestDto dto, @PathVariable int filmId) {
        return filmService.updateFilm(dto, filmId);
    }

    @DeleteMapping("/delete/{filmId}")
    public String deleteFilmById(@PathVariable int filmId) {
        return filmService.deleteFilmById(filmId);
    }
}

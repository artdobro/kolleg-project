package com.onlinecinema.service;

import com.onlinecinema.dto.FilmRequestDto;
import com.onlinecinema.entity.Film;
import com.onlinecinema.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    public Film createFilm(FilmRequestDto dto) {
        Film film = new Film();

        film.setFilmName(dto.getFilmName());
        film.setFilmYear(dto.getFilmYear());
        film.setFilmDescription(dto.getFilmDescription());
        film.setDuration(dto.getDuration());
        film.setPoster(dto.getPoster());
        film.setFilmPath(dto.getFilmPath());

        Film savedFilm = filmRepository.save(film);

        return savedFilm;
    }

    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    public Film getFilmById(int filmId) {
        return filmRepository.findById(filmId).get();
    }

    public Film updateFilm(FilmRequestDto dto, int filmId) {
        Film a = filmRepository.findById(filmId).get();

        a.setFilmName(dto.getFilmName());
        a.setFilmYear(dto.getFilmYear());
        a.setFilmDescription(dto.getFilmDescription());
        a.setDuration(dto.getDuration());
        a.setPoster(dto.getPoster());
        a.setFilmPath(dto.getFilmPath());

        return filmRepository.save(a);
    }

    public String deleteFilmById(int filmId) {
        filmRepository.deleteById(filmId);
        return "Film Deleted Successfully";
    }
}

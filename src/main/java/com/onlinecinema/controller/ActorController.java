package com.onlinecinema.controller;

import com.onlinecinema.dto.ActorRequestDto;
import com.onlinecinema.entity.Actor;
import com.onlinecinema.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actors")
public class ActorController {

    @Autowired
    private ActorService actorService;


    @PostMapping("/add")
    public Actor createActor(@RequestBody ActorRequestDto dto) {
        return actorService.createActor(dto);
    }

    @GetMapping("/all")
    public List<Actor> getAllActors() {
        return actorService.getAllActors();
    }

    @GetMapping("/{actorId}")
    public Actor getActorById(@PathVariable int actorId) {
        return actorService.getActorById(actorId);
    }

    @PutMapping("/update/{actorId}")
    public Actor updateActor(@RequestBody ActorRequestDto dto, @PathVariable int actorId) {
        return actorService.updateActor(dto, actorId);
    }

    @DeleteMapping("/delete/{actorId}")
    public String deleteActorById(@PathVariable int actorId) {
        return actorService.deleteActorById(actorId);
    }
}

package com.onlinecinema.service;

import com.onlinecinema.dto.ActorRequestDto;
import com.onlinecinema.entity.Actor;
import com.onlinecinema.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActorService {

    @Autowired
    private ActorRepository actorRepository;

    public Actor createActor(ActorRequestDto dto) {
        Actor actor = new Actor();

        actor.setActorName(dto.getActorName());
        actor.setActorSurName(dto.getActorSurName());

        Actor savedActor = actorRepository.save(actor);

        return savedActor;
    }

    public List<Actor> getAllActors() {
        return actorRepository.findAll();
    }

    public Actor getActorById(int actorId) {
        return actorRepository.findById(actorId).get();
    }

    public Actor updateActor(ActorRequestDto dto, int actorId) {
        Actor a = actorRepository.findById(actorId).get();

        a.setActorName(dto.getActorName());
        a.setActorSurName(dto.getActorSurName());

        return actorRepository.save(a);
    }

    public String deleteActorById(int actorId) {
        actorRepository.deleteById(actorId);
        return "Actor Deleted Successfully";
    }
}

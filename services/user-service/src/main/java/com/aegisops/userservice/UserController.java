package com.aegisops.userservice;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<UserEntity> getUsers() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public UserEntity getUser(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserEntity createUser(@Valid @RequestBody User request) {
        return repository.save(new UserEntity(request.name(), request.email()));
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    private static class UserNotFoundException extends RuntimeException {
        UserNotFoundException(Long id) { super("User not found: " + id); }
    }
}

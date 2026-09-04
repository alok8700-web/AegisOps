package com.aegisops.userservice;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final AtomicLong ids = new AtomicLong(0);
    private final java.util.concurrent.CopyOnWriteArrayList<User> users = new java.util.concurrent.CopyOnWriteArrayList<>();

    @GetMapping
    public List<User> getUsers() {
        return List.copyOf(users);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return users.stream()
                .filter(user -> user.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@Valid @RequestBody User request) {
        User user = new User(ids.incrementAndGet(), request.name(), request.email());
        users.add(user);
        return user;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    private static class UserNotFoundException extends RuntimeException {
        UserNotFoundException(Long id) {
            super("User not found: " + id);
        }
    }
}

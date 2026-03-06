package com.tiffinwala.Repository;

import com.tiffinwala.Entity.Homemaker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HomemakerRepository extends JpaRepository<Homemaker, Long> {

    // Find Homemaker using User ID (logged-in user)
    Optional<Homemaker> findByUserId(Long userId);
}

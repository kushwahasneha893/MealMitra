package com.tiffinwala.Repository;

import com.tiffinwala.Entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

	// Existing
	List<Menu> findByHomemakerId(Long homemakerId);

	List<Menu> findByCreatedAtAfter(LocalDateTime time);

	void deleteByCreatedAtBefore(LocalDateTime time);

	// ✅ NEW (IMPORTANT)
	Optional<Menu> findByIdAndHomemakerId(Long id, Long homemakerId);
}

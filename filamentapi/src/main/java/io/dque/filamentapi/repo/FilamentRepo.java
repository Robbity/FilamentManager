package io.dque.filamentapi.repo;

import io.dque.filamentapi.domain.Filament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilamentRepo extends JpaRepository<Filament, Integer> {
}

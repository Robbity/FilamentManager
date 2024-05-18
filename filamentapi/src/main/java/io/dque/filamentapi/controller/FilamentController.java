package io.dque.filamentapi.controller;

import io.dque.filamentapi.domain.Filament;
import io.dque.filamentapi.repo.FilamentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/filaments")
public class FilamentController {

    @Autowired
    private FilamentRepo filamentRepository;

    @GetMapping
    public List<Filament> getAllFilaments() {
        return filamentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filament> getFilamentById(@PathVariable Integer id) {
        Optional<Filament> filament = filamentRepository.findById(id);
        return filament.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Filament createFilament(@RequestBody Filament filament) {
        return filamentRepository.save(filament);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filament> updateFilament(@PathVariable Integer id, @RequestBody Filament filamentDetails) {
        Filament existingFilament = filamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filament not found"));

        existingFilament.setFilamentTotal(filamentDetails.getFilamentTotal());
        existingFilament.setFilamentCurr(filamentDetails.getFilamentCurr());
        Filament updatedFilament = filamentRepository.save(existingFilament);
        return ResponseEntity.ok(updatedFilament);
    }

}

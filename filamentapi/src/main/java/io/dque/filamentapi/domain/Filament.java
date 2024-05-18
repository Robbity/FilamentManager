package io.dque.filamentapi.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Filament {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer filamentTotal;
    private Integer filamentCurr;

    // Constructors
    public Filament() {}

    public Filament(Integer id, Integer filamentTotal, Integer filamentCurr) {
        this.id = id;
        this.filamentTotal = filamentTotal;
        this.filamentCurr = filamentCurr;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public Integer getFilamentTotal() {
        return filamentTotal;
    }

    public Integer getFilamentCurr() {
        return filamentCurr;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setFilamentTotal(Integer filamentTotal) {
        this.filamentTotal = filamentTotal;
    }

    public void setFilamentCurr(Integer filamentCurr) {
        this.filamentCurr = filamentCurr;
    }
}

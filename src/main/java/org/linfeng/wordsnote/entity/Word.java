package org.linfeng.wordsnote.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Generated;
import org.hibernate.generator.EventType;

import java.time.OffsetDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "words")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 100, unique = true)
    private String word;

    @Column(nullable = false)
    private String meaning;

    private String source;

    @Column(name = "created_at",insertable = false, updatable = false,columnDefinition = "TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP")
    @Generated(event = EventType.INSERT)
    private OffsetDateTime createdAt;
}

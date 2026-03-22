package org.linfeng.wordsnote.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.generator.EventType;
import org.hibernate.type.SqlTypes;

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

    @Column(columnDefinition = "TEXT")
    private String example;

    private String source;

    @Column(columnDefinition = "vector(1024)")
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    @JdbcTypeCode(SqlTypes.VECTOR)
    private float[] embedding;

    @OneToOne(mappedBy = "word", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private Revision revision;

    @Column(name = "created_at",insertable = false, updatable = false,columnDefinition = "TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP")
    @Generated(event = EventType.INSERT)
    private OffsetDateTime createdAt;

    Word(Long id,OffsetDateTime createdAt,String example,String meaning,String source,String word){
        this.id = id;
        this.createdAt = createdAt;
        this.example = example;
        this.meaning = meaning;
        this.source = source;
        this.word = word;
    }
}

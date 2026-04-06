package org.linfeng.wordsnote.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="revision")
@EntityListeners(AuditingEntityListener.class)
public class Revision {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "easiness_factor")
    private Float easinessFactor = 2.5f;

    Integer repetitions = 0;

    Integer interval = 0;

    @LastModifiedDate
    private LocalDateTime lastRevisionTime;

    private LocalDateTime nextRevisionTime;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Status status;

    @Column(name="revision_times")
    private Integer revisionTimes;

    @OneToOne
    @JoinColumn(name="word_id")
    private Word word;
}

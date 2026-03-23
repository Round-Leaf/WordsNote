package org.linfeng.wordsnote.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.generator.EventType;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

public interface WordWithoutEmbedding {
    Long getId();
    String getWord();
    String getMeaning();
    String getExample();
    String getSource();
    LocalDateTime getCreatedAt();
}

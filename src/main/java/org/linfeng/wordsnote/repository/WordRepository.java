package org.linfeng.wordsnote.repository;

import org.linfeng.wordsnote.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

    Page<Word> findByWordContaining(String word, Pageable pageable);

    @Query("SELECT DISTINCT source FROM Word")
    List<String> findSources();
}

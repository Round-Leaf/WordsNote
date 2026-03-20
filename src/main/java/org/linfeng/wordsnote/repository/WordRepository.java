package org.linfeng.wordsnote.repository;

import org.linfeng.wordsnote.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

    Page<Word> findByWordContaining(String word, Pageable pageable);
}

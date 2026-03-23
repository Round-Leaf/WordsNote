package org.linfeng.wordsnote.repository;

import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.entity.WordWithoutEmbedding;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

    @Query(value = "SELECT * FROM words WHERE unaccent(word) ILIKE CONCAT('%', :word, '%')",
            nativeQuery = true)
    Page<Word> findByWordContaining(String word,Pageable pageable);

    @Query("SELECT DISTINCT source FROM Word")
    List<String> findSources();

    @Query(value="SELECT new Word(id,createdAt,example,meaning,source,word) FROM Word")
    Page<Word> findAllWithoutEmbedding(Pageable pageable);

    @Query(value="SELECT id,word,meaning,example,source,created_at FROM words ORDER BY " +
            "embedding <=> CAST(:embedding AS vector)" +
            "ASC",
            countQuery = "SELECT count(*) FROM words"
            ,nativeQuery = true)
    Page<WordWithoutEmbedding> findSynonym(float[] embedding,Pageable Page);
}

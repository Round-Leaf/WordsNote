package org.linfeng.wordsnote.service;

import jakarta.validation.Valid;
import org.linfeng.wordsnote.DTO.WordDTO;
import org.linfeng.wordsnote.entity.Revision;
import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.entity.WordWithoutEmbedding;
import org.linfeng.wordsnote.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class WordService {
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private EmbeddingService embeddingService;

    public Map<String,Object> findAll(Pageable pageable){
        Map<String,Object> response = new HashMap<>();
        Page<Word> page = wordRepository.findAllWithoutEmbedding(pageable);
        response.put("words",page.getContent());
        response.put("currentPage",page.getNumber());
        response.put("totalItems",page.getTotalElements());
        response.put("totalPages",page.getTotalPages());
        return  response;

    }

    public Map<String, Object> searchWord(String query,Pageable pageable) {
        Map<String,Object> response = new HashMap<>();
        Page<Word> page = wordRepository.findByWordContaining(query,pageable);
        response.put("words",page.getContent());
        response.put("currentPage",page.getNumber());
        response.put("totalItems",page.getTotalElements());
        response.put("totalPages",page.getTotalPages());
        return response;
    }

    @Transactional
    public Word addWord(@Valid WordDTO wordDTO) throws IOException, InterruptedException {
        Word word = new Word();
        word.setWord(wordDTO.getWord());
        word.setMeaning(wordDTO.getMeaning());
        word.setExample(wordDTO.getExample());
        word.setSource(wordDTO.getSource());
        word.setEmbedding(embeddingService.getEmbedding(word.getMeaning()));
        Revision revision = new Revision();
        revision.setWord(word);
        word.setRevision(revision);
        return wordRepository.save(word);
    }


    public Map<String, Object> findSynonymById(Long id, Pageable pageable) {
        Map<String,Object> response = new HashMap<>();
        Word word = wordRepository.findById(id).orElseThrow();
        Page<WordWithoutEmbedding> page = wordRepository.findSynonym(word.getEmbedding(),pageable);
        response.put("words",page.getContent());
        response.put("currentPage",page.getNumber());
        response.put("totalItems",page.getTotalElements());
        response.put("totalPages",page.getTotalPages());
        return response;
    }

    public Map<String, Object> findSynonymByMeaning(String meaning, Pageable pageable) throws IOException, InterruptedException {
        Map<String,Object> response = new HashMap<>();
        Page<WordWithoutEmbedding> page = wordRepository.findSynonym(embeddingService.getEmbedding(meaning),pageable);
        response.put("words",page.getContent());
        response.put("currentPage",page.getNumber());
        response.put("totalItems",page.getTotalElements());
        response.put("totalPages",page.getTotalPages());
        return response;
    }

    @Transactional
    public Word updateWord(Long id, @Valid WordDTO wordDTO) throws IOException, InterruptedException {
        Word word = wordRepository.findById(id).orElseThrow();
        word.setWord(wordDTO.getWord());
        word.setSource(wordDTO.getSource());
        word.setMeaning(wordDTO.getMeaning());
        word.setExample(wordDTO.getExample());
        word.setEmbedding(embeddingService.getEmbedding(word.getMeaning()));
        return word;
    }
}

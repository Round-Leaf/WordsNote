package org.linfeng.wordsnote.controller;

import jakarta.validation.Valid;
import org.linfeng.wordsnote.DTO.WordDTO;
import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.repository.WordRepository;
import org.linfeng.wordsnote.service.WordService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/word")
public class WordController {
    private WordService wordService;
    private WordRepository wordRepository;
    public WordController(WordService wordService,WordRepository wordRepository){
        this.wordService = wordService;
        this.wordRepository = wordRepository;
    }
    @GetMapping("/list")
    public Map<String, Object> welcome() {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "success");
        map.put("message", "Welcome to Spring Boot Web Project!");
        wordService.demo();
        return map;
    }

    @PostMapping("/add")
    public WordDTO addWord(@Valid @RequestBody WordDTO wordDTO){
        Word word = new Word();
        word.setWord(wordDTO.getWord());
        word.setMeaning(wordDTO.getMeaning());
        word.setSource(wordDTO.getSource());
        wordRepository.save(word);
        return new WordDTO(word.getWord(),word.getMeaning(),word.getSource());
    }
}

package org.linfeng.wordsnote.controller;

import jakarta.validation.Valid;
import org.linfeng.wordsnote.DTO.WordDTO;
import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.repository.WordRepository;
import org.linfeng.wordsnote.service.WordService;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/words")
@CrossOrigin(origins = "http://localhost:5173")
public class WordController {
    private WordService wordService;
    private WordRepository wordRepository;
    public WordController(WordService wordService,WordRepository wordRepository){
        this.wordService = wordService;
        this.wordRepository = wordRepository;
    }

    @GetMapping
    public Map<String, Object> welcome(@RequestParam(name="q",required = false,defaultValue = "") String query,
                                       Pageable pageable) {
        Map<String,Object> response = new HashMap<>();
        var page = wordRepository.findByWordContaining(query,pageable);
        if(query!=null){
            response.put("words",page.getContent());
            response.put("currentPage",page.getNumber());
            response.put("totalItems",page.getTotalElements());
            response.put("totalPages",page.getTotalPages());
            return  response;
        }else{
            return null;
        }
    }

    @PostMapping
    public WordDTO addWord(@Valid @RequestBody WordDTO wordDTO){
        Word word = new Word();
        word.setWord(wordDTO.getWord());
        word.setMeaning(wordDTO.getMeaning());
        word.setExample(wordDTO.getExample());
        word.setSource(wordDTO.getSource());
        wordRepository.save(word);
        return new WordDTO(word.getWord(),word.getMeaning(),word.getExample(),word.getSource());
    }
}

package org.linfeng.wordsnote.controller;

import jakarta.validation.Valid;
import org.linfeng.wordsnote.DTO.WordDTO;
import org.linfeng.wordsnote.common.result.Result;
import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.repository.WordRepository;
import org.linfeng.wordsnote.service.WordService;
import org.springframework.util.StringUtils;
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

    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable("id") Long id){
        wordRepository.deleteById(id);
        return Result.success("delete success");
    }

    @GetMapping
    public Map<String, Object> get(@RequestParam(name="q",required = false,defaultValue = "") String query,
                                       Pageable pageable) {
        if(StringUtils.hasText(query)){
            return wordService.searchWord(query);
        }else {
            return wordService.findAll(pageable);
        }
    }

    @PostMapping
    public Word addWord(@Valid @RequestBody WordDTO wordDTO){
        Word word = new Word();
        word.setWord(wordDTO.getWord());
        word.setMeaning(wordDTO.getMeaning());
        word.setExample(wordDTO.getExample());
        word.setSource(wordDTO.getSource());
        return wordRepository.save(word);
    }
}

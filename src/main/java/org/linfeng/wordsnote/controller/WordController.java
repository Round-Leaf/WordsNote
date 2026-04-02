package org.linfeng.wordsnote.controller;

import jakarta.validation.Valid;
import org.linfeng.wordsnote.DTO.WordDTO;
import org.linfeng.wordsnote.common.result.Result;
import org.linfeng.wordsnote.entity.Revision;
import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.entity.WordWithoutEmbedding;
import org.linfeng.wordsnote.repository.RevisionRepository;
import org.linfeng.wordsnote.repository.WordRepository;
import org.linfeng.wordsnote.service.EmbeddingService;
import org.linfeng.wordsnote.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/words")
@CrossOrigin(origins = "http://localhost:5173")
public class WordController {
    private WordService wordService;
    private WordRepository wordRepository;
    private RevisionRepository revisionRepository;

    @Autowired
    private EmbeddingService embeddingService;

    public WordController(WordService wordService,WordRepository wordRepository,RevisionRepository revisionRepository){
        this.wordService = wordService;
        this.wordRepository = wordRepository;
        this.revisionRepository = revisionRepository;
    }

    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable("id") Long id){
        wordRepository.deleteById(id);
        return Result.success("delete success");
    }

    @PutMapping("/{id}")
    public Word updateWord(@PathVariable("id") Long id,@Valid @RequestBody WordDTO wordDTO) throws IOException, InterruptedException {
        System.out.println("获取了put");
        return wordService.updateWord(id,wordDTO);
    }

    @GetMapping
    public Map<String, Object> get(@RequestParam(name="q",required = false,defaultValue = "") String query,
                                       @RequestParam(required = false,defaultValue = "word") String searchBy,Pageable pageable) throws IOException, InterruptedException {
        if(StringUtils.hasText(query)){
            if(searchBy.equals("word")) {
                return wordService.searchWord(query,pageable);
            }else if(searchBy.equals("meaning")){
                if(query==null) throw new RuntimeException("You must send query");
                if(org.apache.commons.lang3.StringUtils.isNumeric(query)) {
                    Long id = Long.valueOf(query);
                    return wordService.findSynonymById(id,pageable);
                }else{
                    return wordService.findSynonymByMeaning(query,pageable);
                }
            }
            throw new RuntimeException("searchBy must be meaning or word");
        }else {
            return wordService.findAll(pageable);
        }
    }

    @GetMapping("/embedding")
    @Transactional
    public List<Word> updateEmbedding() throws IOException, InterruptedException {
        List<Word> words = wordRepository.findAll();
        for(Word word:words){
            if(word.getEmbedding()==null){
                word.setEmbedding(embeddingService.getEmbedding(word.getMeaning()));
            }
        }
        return words;
    }




    @PostMapping
    public Word addWord(@Valid @RequestBody WordDTO wordDTO) throws IOException, InterruptedException {
        return wordService.addWord(wordDTO);
    }
}

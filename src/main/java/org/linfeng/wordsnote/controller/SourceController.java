package org.linfeng.wordsnote.controller;

import org.linfeng.wordsnote.common.result.Result;
import org.linfeng.wordsnote.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sources")
@CrossOrigin(origins = "http://localhost:5173")
public class SourceController {

    @Autowired
    WordRepository wordRepository;

    @GetMapping
    public List<String> getSources(){
        return wordRepository.findSources();
    }
    @PostMapping
    public Result<String> testRe() throws Exception {
        throw new Exception("haha");
    }
}

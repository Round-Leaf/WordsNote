package org.linfeng.wordsnote.service;

import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WordService {
    @Autowired
    private WordRepository wordRepository;

    public void demo(){
        Word newWord = new Word();
        newWord.setWord("test");
        newWord.setMeaning("test1");
        newWord.setSource("test2");
        wordRepository.save(newWord);
    }
}

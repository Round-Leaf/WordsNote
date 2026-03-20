package org.linfeng.wordsnote.service;

import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class WordService {
    @Autowired
    private WordRepository wordRepository;

    public Map<String,Object> findAll(Pageable pageable){
        Map<String,Object> response = new HashMap<>();
        Page<Word> page = wordRepository.findAll(pageable);
        response.put("words",page.getContent());
        response.put("currentPage",page.getNumber());
        response.put("totalItems",page.getTotalElements());
        response.put("totalPages",page.getTotalPages());
        return  response;

    }
}

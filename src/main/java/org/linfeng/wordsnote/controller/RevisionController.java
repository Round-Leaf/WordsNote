package org.linfeng.wordsnote.controller;

import org.linfeng.wordsnote.common.result.Result;
import org.linfeng.wordsnote.entity.Revision;
import org.linfeng.wordsnote.entity.Word;
import org.linfeng.wordsnote.repository.RevisionRepository;
import org.linfeng.wordsnote.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/revision")
public class RevisionController {
    @Autowired
    RevisionRepository revisionRepository;
    @Autowired
    WordRepository wordRepository;

    @GetMapping
    public Result<String> revision(@RequestParam Long id){
        Revision revision = revisionRepository.findById(id).orElseGet(()->{
            Revision newRevision = new Revision();
            //newRevision.setLastRevisionTime(OffsetDateTime.now());
            Word word = wordRepository.findById(id).orElseThrow();
            newRevision.setRevisionTimes(0);
            newRevision.setWord(word);
            return newRevision;
        });
        revision.setRevisionTimes(revision.getRevisionTimes()+1);
        revisionRepository.save(revision);
        return Result.success("Success");
    }
}

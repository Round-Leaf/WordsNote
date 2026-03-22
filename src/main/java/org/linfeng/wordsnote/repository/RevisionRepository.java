package org.linfeng.wordsnote.repository;

import org.linfeng.wordsnote.entity.Revision;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevisionRepository extends JpaRepository<Revision,Long> {

}

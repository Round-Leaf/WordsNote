package org.linfeng.wordsnote.DTO;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WordDTO {
    @NotBlank
    private String word;

    @NotBlank
    private String meaning;

    private String example;

    private String source;
}

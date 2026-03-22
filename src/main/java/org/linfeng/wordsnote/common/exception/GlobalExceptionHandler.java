package org.linfeng.wordsnote.common.exception;

import org.linfeng.wordsnote.common.result.Result;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@EnableJpaAuditing
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result<?> handleException(Exception e) {
        return Result.error(500, "Unknown Error: " + e.getMessage());
    }
}

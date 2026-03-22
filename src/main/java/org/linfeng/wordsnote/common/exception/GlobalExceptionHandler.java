package org.linfeng.wordsnote.common.exception;

import org.linfeng.wordsnote.common.result.Result;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@EnableJpaAuditing
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Result<?>> handleException(Exception e) {
        Result<?> errorResult = Result.error(500, "Unknown Error: " + e.getMessage());

        return new ResponseEntity<>(errorResult, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

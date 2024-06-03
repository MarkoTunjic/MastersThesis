package hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.presentation;

import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.application.ICrudGeneratorService;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.AvailableTablesDto;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.DatabaseConnectionData;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.GenerationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@CrossOrigin
@RestController("/api/crud-generator")
@RequiredArgsConstructor
public class CrudGeneratorController {
    private final ICrudGeneratorService crudGeneratorService;

    @GetMapping(value="/get-available-tables", produces = MediaType.APPLICATION_JSON_VALUE)
    public AvailableTablesDto getAvailableTables(DatabaseConnectionData databaseConnectionData){
        var result = crudGeneratorService.getAvailableTables(databaseConnectionData);
        return new AvailableTablesDto(result);
    }

    @GetMapping(value="/generate", produces="application/zip")
    public ResponseEntity<StreamingResponseBody> generateProject(GenerationRequestDto generationRequest, DatabaseConnectionData databaseConnectionData){
        var zipResult = crudGeneratorService.generateProject(generationRequest, databaseConnectionData);
        return ResponseEntity.ok()
                .header("Content-Disposition","attachment; filename=\"%s.zip\"".formatted(generationRequest.solutionName()))
                .body(out->out.write(zipResult));
    }
}

package hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.application;

import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.DatabaseConnectionData;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.GenerationRequestDto;

import java.util.List;

public interface ICrudGeneratorService {
    byte[] generateProject(GenerationRequestDto generationRequest, DatabaseConnectionData databaseConnectionData);

    List<String> getAvailableTables(DatabaseConnectionData databaseConnectionData);
}

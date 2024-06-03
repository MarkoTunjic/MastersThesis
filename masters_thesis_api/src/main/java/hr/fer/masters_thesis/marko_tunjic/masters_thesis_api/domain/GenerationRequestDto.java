package hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain;

import java.util.List;

public record GenerationRequestDto(
        String solutionName,
        String projectName,
        List<String> architectures,
        List<String> includedTables,
        boolean cascade) {
}

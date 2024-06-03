package hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain;

public record DatabaseConnectionData(
        String databaseName,
        String databaseServer,
        String databasePort,
        String databaseUid,
        String databasePwd,
        String provider) {
}

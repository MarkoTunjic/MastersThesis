package hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.mappers;

import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.DatabaseConnectionData;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.grpc.GeneratorOuterClass;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DatabaseConnectionDataMapper {
    GeneratorOuterClass.GrpcDatabaseConnectionData toGrpcRequest(DatabaseConnectionData databaseConnectionData);
}

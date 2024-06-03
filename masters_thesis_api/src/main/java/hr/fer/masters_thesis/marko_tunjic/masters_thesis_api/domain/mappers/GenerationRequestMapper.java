package hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.mappers;

import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.GenerationRequestDto;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.grpc.GeneratorOuterClass;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface GenerationRequestMapper {
    GeneratorOuterClass.GenerationRequestMessage toRequest(GenerationRequestDto requestDto, @MappingTarget GeneratorOuterClass.GenerationRequestMessage.Builder target);

    default GeneratorOuterClass.GenerationRequestMessage toGrpcRequest(GenerationRequestDto requestDto, GeneratorOuterClass.GrpcDatabaseConnectionData databaseConnectionData) {
        var builder = GeneratorOuterClass.GenerationRequestMessage.newBuilder();
        if (requestDto.includedTables() != null)
            builder.addAllIncludedTables(requestDto.includedTables());
        if(requestDto.architectures() != null)
            builder.addAllArchitectures(requestDto.architectures());
        builder.setDatabaseConnectionData(databaseConnectionData);
        return toRequest(requestDto, builder);
    }
}

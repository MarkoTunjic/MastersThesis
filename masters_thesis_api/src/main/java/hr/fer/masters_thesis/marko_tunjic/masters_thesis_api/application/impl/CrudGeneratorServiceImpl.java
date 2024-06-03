package hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.application.impl;

import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.application.ICrudGeneratorService;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.DatabaseConnectionData;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.GenerationRequestDto;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.mappers.DatabaseConnectionDataMapper;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.domain.mappers.GenerationRequestMapper;
import hr.fer.masters_thesis.marko_tunjic.masters_thesis_api.grpc.GeneratorGrpc;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrudGeneratorServiceImpl implements ICrudGeneratorService {
    @GrpcClient("generator")
    private GeneratorGrpc.GeneratorBlockingStub blockingStub;
    private final GenerationRequestMapper generationRequestMapper;
    private final DatabaseConnectionDataMapper databaseConnectionDataMapper;

    @Override
    public byte[] generateProject(GenerationRequestDto generationRequest, DatabaseConnectionData databaseConnectionData) {
        return blockingStub.generateProject(generationRequestMapper.toGrpcRequest(generationRequest, databaseConnectionDataMapper.toGrpcRequest(databaseConnectionData))).getZip().toByteArray();
    }

    @Override
    public List<String> getAvailableTables(DatabaseConnectionData databaseConnectionData) {
        return blockingStub.getAvailableTables(databaseConnectionDataMapper.toGrpcRequest(databaseConnectionData)).getAvailableTablesList();
    }

}

import { Variables } from '@app/variables';

export class UpdateCaptureData {
  static readonly type = '[ApiGenerator] UpdateCaptureData';
  constructor(public captureData: Variables) {}
}

export class GetAvailableTables {
  static readonly type = '[ApiGenerator] GetAvailableTables';
  constructor() {}
}

export class GenerateApi {
  static readonly type = '[ApiGenerator] GenerateApi';
  constructor() {}
}

export class ShowErrorMessage {
  static readonly type = '[ApiGenerator] ShowErrorMessage';
  constructor(public message: string) {}
}

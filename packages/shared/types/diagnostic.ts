interface Range {
  line: number;
  column: number;
}

interface DiagnosticLocation {
  start: Range;
  end: Range;
}

export class DiagnosticError extends Error {
  constructor(
    public readonly location: DiagnosticLocation,
    public readonly message: string,
  ) {
    super(message);
  }
}

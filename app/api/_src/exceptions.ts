// Exceptions

export class DatabaseConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseConnectionError';
  }
}

export class InvalidUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserError';
  }
}

export class InvalidTaskError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTaskError';
  }
}

export class MissingFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingFieldError';
  }
}
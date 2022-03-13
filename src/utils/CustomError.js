class CustomError {
  constructor(status, description, error = undefined) {
    this.status = status;
    this.description = description;
    if (error) this.error = error.message ?? error;
  }
}

export default CustomError;

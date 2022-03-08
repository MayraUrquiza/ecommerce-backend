class CustomError {
  constructor(status, description, error = undefined) {
    this.status = status;
    this.description = description;
    if (error) this.error = error;
  }
}

export default CustomError;

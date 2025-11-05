import { Response } from "express";

export class ApiResponse {
  static success(res, message = "Sucesso", data = null, status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message = "Erro", status = 400, errors = null) {
    return res.status(status).json({
      success: false,
      message,
      errors,
    });
  }
}
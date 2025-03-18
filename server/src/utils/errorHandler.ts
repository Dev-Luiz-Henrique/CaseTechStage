import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "@/utils/CustomErrors";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ZodError)
        return res.status(400).json({ message: err.errors.map(e => e.message).join(", ") });
    
    if (err instanceof AppError)
        return res.status(err.statusCode).json({ message: err.message });
    
    return res.status(500).json({ message: "Erro interno do servidor" });    
};

export default errorHandler;

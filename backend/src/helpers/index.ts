import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
  };


export { errorHandler}
import { NextFunction, Request, Response } from 'express';

export default (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error);
  response.sendStatus(500);
};

/* eslint-disable @typescript-eslint/no-empty-interface */
import { Request, Response, NextFunction } from 'express';
import { ITokenPayload } from './auth';

export interface ApiResponse extends Response {}

export interface ApiRequest extends Request {
  user: ITokenPayload;
}

export interface ApiNextFunction extends NextFunction {}

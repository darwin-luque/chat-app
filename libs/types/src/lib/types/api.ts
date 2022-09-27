/* eslint-disable @typescript-eslint/no-empty-interface */
import { Request, Response, NextFunction } from 'express';
import { ITokenPayload } from './auth';

export interface ApiResponse extends Response {}

export interface ApiRequest extends Request {
  user: ITokenPayload;
}

export interface ApiNextFunction extends NextFunction {}

export interface IPage {
  offset: number;
  limit: number;
}

export interface IPaginationOutput<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
  next: IPage | null;
  prev: IPage | null;
}

export enum ESortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

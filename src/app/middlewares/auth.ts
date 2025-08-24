import { NextFunction, Request, Response } from 'express';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import ApiError from '../errors/apiError';
import httpStatus from 'http-status';

export const auth = (...roles: string[]) => {
  return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret,
      ) as JwtPayload;
      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

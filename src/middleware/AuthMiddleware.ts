// ** Express Imports
import { Request, Response, NextFunction } from 'express'

// ** Jwt Imports
import jwt from 'jsonwebtoken'

// ** Entity Imports
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_SECRET_ACCESS_KEY,
  JWT_SECRET_REFRESH_KEY,
} from 'config'
import User from 'domain/user.entity'

/**
 * 헤더에서 AccessToken을 추출한다.
 * @param req
 */
const extractAccessToken = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
}

/**
 * RefreshToken을 추출한다.
 * @param req
 */
const extractRefreshToken = (req: Request) => {
  if (req.body.refreshToken) {
    return req.body.refreshToken
  }
}

/**
 * JWT AccessToken을 체크한다.
 * @param req
 * @param res
 * @param next
 */
export const checkAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractAccessToken(req)
    const jwtPayload: any = jwt.verify(token, JWT_SECRET_ACCESS_KEY)
    if (jwtPayload.type !== 'USER') {
      return res.status(403).json({
        code: 403,
        message: 'Refresh JWT token Not Access',
      })
    }

    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    if (error.name === 'TokenExpireError') {
      return res.status(401).json({
        code: 401,
        message: 'Access JWT token has expired',
      })
    }

    return res.status(401).send({
      message: 'Invalid or Missing Access JWT token',
      statusCode: 401,
    })
  }

  next()
}

/**
 * JWT RefreshToken을 체크한다.
 * @param req
 * @param res
 * @param next
 */
export const checkRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractRefreshToken(req)
    const jwtPayload: any = jwt.verify(token, JWT_SECRET_REFRESH_KEY)
    if (jwtPayload.type !== 'USER') {
      return res.status(403).json({
        code: 403,
        message: 'Refresh JWT token Not Access',
      })
    }
    res.locals.jwtPayload = jwtPayload
    res.locals.token = token
  } catch (error) {
    if (error.name === 'TokenExpireError') {
      return res.status(401).json({
        code: 401,
        message: 'Refresh JWT token has expired',
      })
    }

    return res
      .status(401)
      .send({ message: 'Invalid or Missing Refresh JWT token', status: 401 })
  }

  next()
}

/**
 * Admin의 JWT AccessToken을 체크한다.
 * @param req
 * @param res
 * @param next
 */
export const checkAdminAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractAccessToken(req)
    const jwtPayload: any = jwt.verify(token, JWT_SECRET_ACCESS_KEY)
    if (jwtPayload.type !== 'ADMIN') {
      return res.status(401).json({
        code: 403,
        message: 'Refresh JWT token Not Access',
      })
    }
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    if (error.name === 'TokenExpireError') {
      return res.status(401).json({
        code: 401,
        message: 'Access JWT token has expired',
      })
    }

    return res.status(401).send({
      message: 'Invalid or Missing Access JWT token',
      statusCode: 401,
    })
  }

  next()
}

/**
 * Admin의 JWT RefreshToken을 체크한다.
 * @param req
 * @param res
 * @param next
 */
export const checkAdminRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractRefreshToken(req)
    const jwtPayload: any = jwt.verify(token, JWT_SECRET_REFRESH_KEY)

    if (jwtPayload.type !== 'ADMIN') {
      return res.status(401).json({
        code: 403,
        message: 'Refresh JWT token Not Access',
      })
    }

    res.locals.jwtPayload = jwtPayload
    res.locals.token = token
  } catch (error) {
    if (error.name === 'TokenExpireError') {
      return res.status(401).json({
        code: 401,
        message: 'Refresh JWT token has expired',
      })
    }

    return res
      .status(401)
      .send({ message: 'Invalid or Missing Refresh JWT token', status: 401 })
  }

  next()
}

/**
 * JWT AccessToken을 만든다.
 * @param user
 */
export const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id, type: 'USER' }, JWT_SECRET_ACCESS_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  })
}

/**
 * JWT RefreshToken을 만든다.
 * @param user
 */
export const generateRefreshToken = (user: User) => {
  return jwt.sign({ userId: user.id, type: 'USER' }, JWT_SECRET_REFRESH_KEY, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  })
}

/**
 * JWT Access Token과 Refresh Token을 만듭니다.
 * @param user
 */
export const generateToken = (user: User) => {
  return {
    accessToken: jwt.sign(
      { userId: user.id, type: 'USER' },
      JWT_SECRET_ACCESS_KEY,
      {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    ),
    refreshToken: jwt.sign(
      { userId: user.id, type: 'USER' },
      JWT_SECRET_REFRESH_KEY,
      {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      },
    ),
  }
}

// /**
//  * JWT Access Token과 Refresh Token을 만듭니다.
//  * @param user
//  */
// export const generateAdminToken = (admin: Admin) => {
//   return {
//     accessToken: jwt.sign(
//       { userId: admin.id, type: 'ADMIN' },
//       JWT_SECRET_ACCESS_KEY,
//       {
//         expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
//       },
//     ),
//     refreshToken: jwt.sign(
//       { userId: admin.id, type: 'ADMIN' },
//       JWT_SECRET_REFRESH_KEY,
//       {
//         expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
//       },
//     ),
//   }
// }

/**
 * JWT에서 유저 정보를 추출합니다.
 */
export const getUserInfoByToken = async (token: string) => {
  return jwt.verify(token, JWT_SECRET_REFRESH_KEY)
}

export const getUserInfoByAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET_ACCESS_KEY)
}

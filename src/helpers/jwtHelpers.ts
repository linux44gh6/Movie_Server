import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";


const generateToken = (payload: any, secret: Secret, expiresIn: string | number) => {
    const token = jwt.sign(payload, secret, {
        expiresIn,
        algorithm: 'HS256'
    } as SignOptions)
    return token
}

const decodeToken = (token: string, secret: Secret) => {
    const decoded = jwt.verify(token, secret) as JwtPayload
    return decoded
}

export const jwtHelpers = {
    generateToken,
    decodeToken
}

import { Secret } from "jsonwebtoken"
import config from "../../../config"
import { jwtHelpers } from "../../../helpers/jwtHelpers"
import prisma from "../../../helpers/prisma"
import bcrypt from 'bcrypt'

const loginUser = async (payload: any) => {

    const userData = await prisma.users.findFirstOrThrow({
        where: {
            email: payload.email
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password)

    if (!isCorrectPassword) {
        throw new Error('Invalid password')
    }

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, config.jwt.jwt_secret as Secret, config.jwt.expires_in as string)


    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, config.jwt.refresh_token_secret as Secret, config.jwt.refresh_token_expires_in as string)

    return {
        accessToken,
        refreshToken
    }

}

export const AuthServices = {
    loginUser
}

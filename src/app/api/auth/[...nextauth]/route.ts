import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const employee = await prisma.employee.findFirst({
                    where: { email: credentials.email }
                })

                if (!employee || !employee.password) return null

                const isValid = await bcrypt.compare(credentials.password, employee.password)

                if (!isValid) return null

                return {
                    id: employee.id,
                    name: employee.name,
                    email: employee.email,
                    tenantId: employee.tenantId
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.tenantId = user.tenantId
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.tenantId = token.tenantId as string
            }
            return session
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/signin",
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

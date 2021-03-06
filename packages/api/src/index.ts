import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import express, { Response, Request } from "express"
import morgan from "morgan"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"

import { createDbConnection } from "./db"
import { authChecker } from "./lib/authChecker"
import { session } from "./lib/session"

import { cors, PORT, resolverPaths, isProduction } from "./lib/config"

import { userLoader } from "./modules/user/user.loader"
import { shareLoader } from "./modules/share/share.loader"

async function main() {
  try {
    await createDbConnection(isProduction)

    const app = express()
      .enable("trust proxy")
      .use(morgan("dev"))
      .use(session)

    const schema = await buildSchema({
      authChecker,
      authMode: "null",
      container: Container,
      resolvers: [__dirname + resolverPaths],
    })

    const apolloServer = new ApolloServer({
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
        userLoader: userLoader(),
        shareLoader: shareLoader(),
      }),
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      cors,
      app,
    })

    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT} 🚀`),
    )
  } catch (error) {
    console.log(error)
  }
}

main()

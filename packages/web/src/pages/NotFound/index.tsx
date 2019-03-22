import React, { memo, useContext } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"
import { AppContext } from "../../application/context"

import Center from "../../components/styled/Center"

function NotFound(_: RouteComponentProps) {
  const { user } = useContext(AppContext)

  if (user) return <Redirect to="/" noThrow={true} />
  return (
    <Center style={{ height: "100vh" }}>
      <h3 style={{ width: "100%", textAlign: "center" }}>Not found 😲</h3>
    </Center>
  )
}

export default memo(NotFound)

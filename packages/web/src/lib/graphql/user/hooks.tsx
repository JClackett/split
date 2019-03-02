import { useMutation, useApolloClient, useQuery } from "react-apollo-hooks"

import {
  Login,
  UpdateUser,
  Register,
  InviteUser,
  ForgotPassword,
  ResetPassword,
  Me,
} from "../types"

import {
  LOGIN,
  ME,
  UPDATE_USER,
  REGISTER,
  LOGOUT,
  INVITE_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "./queries"
import { GET_HOUSE } from "../house/queries"

export function useMeQuery() {
  const { data, loading } = useQuery<Me.Query>(ME, { suspend: false })
  const user = (data && data.me) || null
  return { user, userLoading: loading }
}
export function useLoginMutation() {
  return useMutation<Login.Mutation, Login.Variables>(LOGIN, {
    refetchQueries: [{ query: GET_HOUSE }],
    awaitRefetchQueries: true,
    update: (cache, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.login.token)
        cache.writeQuery({ query: ME, data: { me: res.data.login.user } })
      }
    },
  })
}

export function useUpdateUserMutation() {
  return useMutation<UpdateUser.Mutation, UpdateUser.Variables>(UPDATE_USER, {
    update: (cache, res) => {
      if (res.data && res.data.updateUser) {
        cache.writeQuery({ query: ME, data: { me: res.data.updateUser } })
      }
    },
  })
}

export function useRegisterMutation() {
  return useMutation<Register.Mutation, Register.Variables>(REGISTER, {
    refetchQueries: [{ query: GET_HOUSE }],
    awaitRefetchQueries: true,
    update: (cache, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.register.token)
        cache.writeQuery({ query: ME, data: { me: res.data.register.user } })
      }
    },
  })
}

export function useLogoutMutation() {
  const client = useApolloClient()
  const logout = useMutation(LOGOUT)

  const handleLogout = async () => {
    localStorage.removeItem("token")
    await logout({
      update: cache => cache.writeQuery({ query: ME, data: { me: null } }),
    })
    await client.resetStore()
  }

  return handleLogout
}

export function useInviteUserMutation() {
  return useMutation<InviteUser.Mutation, InviteUser.Variables>(INVITE_USER)
}

export function useForgotPasswordMutation() {
  return useMutation<ForgotPassword.Mutation, ForgotPassword.Variables>(
    FORGOT_PASSWORD,
  )
}

export function useResetPasswordMutation() {
  return useMutation<ResetPassword.Mutation, ResetPassword.Variables>(
    RESET_PASSWORD,
  )
}

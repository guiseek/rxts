export function createAction<Obj extends { [index: string]: any }>() {
  return function <Key extends keyof Obj>(
    name: Key,
    ...args: Obj[Key] extends undefined ? [] : [Obj[Key]]
  ) {
    if (args.length > 0) {
      return { type: name, payload: args[0] }
    }
    return { type: name }
  }
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

enum User {
  SignInObject = 'User/SignInObject',
  SignInTuple = 'User/SignInTuple',
  SignInSuccess = 'User/SignInSuccess',
  SignInError = 'User/SignInError',
}

type Messages = {
  [User.SignInObject]: { username: string; password: string }
  [User.SignInTuple]: [string, string]
  [User.SignInError]: string
  [User.SignInSuccess]: void
}

export type Actions = ActionMap<Messages>[keyof ActionMap<Messages>]
export const action = createAction<Messages>()

action(User.SignInError, 'Yay')

action(User.SignInError, '404')

action(User.SignInTuple, ['username', ''])

action(User.SignInTuple, ['guiseek', 'awesome'])

action(User.SignInObject, {
  username: 'guiseek',
  password: '123456',
})

// valid
action(User.SignInSuccess)

interface UserState {
  username: null | string
  password: null | string
  message: null | string
}

const initialState = {
  username: null,
  password: null,
  message: null,
}

export function switcher(
  state = initialState,
  { type, payload }: Actions
): UserState {
  switch (type) {
    case User.SignInObject: {
      return {
        ...state,
        ...payload,
      }
    }

    case User.SignInError: {
      return {
        ...state,
        message: payload,
      }
    }

    case User.SignInSuccess: {
      console.log(action)
      return state
    }

    default: {
      return state
    }
  }
}

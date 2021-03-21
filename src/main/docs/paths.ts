import {
  signinPath,
  userPath,
  deleteUserPath
} from './paths/'

export default {
  '/users/signin': signinPath,
  '/users': userPath,
  '/users/{userId}': deleteUserPath
}

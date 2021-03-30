import {
  signinPath,
  userPath,
  deleteUserPath,
  toolPath,
  deleteToolPath
} from './paths/'

export default {
  '/users/signin': signinPath,
  '/users': userPath,
  '/users/{userId}': deleteUserPath,
  '/tools': toolPath,
  '/tools/{toolId}': deleteToolPath
}

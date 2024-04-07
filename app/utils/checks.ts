import { jwtDecode } from 'jwt-decode';

import { type ProfileJWT } from '#types';

type CheckAuthentificationArgs = {
  userEncoded: string | undefined;
};

export function checkAuthentification(args: CheckAuthentificationArgs): number | null {
  const { userEncoded } = args;

  if (userEncoded === undefined) {
    return null;
  }

  const userDecoded = jwtDecode<ProfileJWT>(userEncoded);
  const userId = userDecoded.id;

  return userId;
}

type CheckIfDeletedArgs = {
  result: number;
};

export function checkIfDeleted(args: CheckIfDeletedArgs): boolean {
  const { result } = args;

  if (result === 0) {
    return false;
  }

  return true;
}

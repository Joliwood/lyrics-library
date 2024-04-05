import { jwtDecode } from 'jwt-decode';

import { type ProfileJWT } from '#types';

type CheckAuthentificationArgs = {
  userEncoded: string | undefined;
};

function checkAuthentification(args: CheckAuthentificationArgs): number | null {
  const { userEncoded } = args;

  if (userEncoded === undefined) {
    return null;
  }

  const userDecoded = jwtDecode<ProfileJWT>(userEncoded);
  const userId = userDecoded.id;

  return userId;
}

export default checkAuthentification;

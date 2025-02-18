import NextCors from 'nextjs-cors';
import supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import UserMetadata from 'supertokens-node/recipe/usermetadata';

import type { IClub } from '@/interfaces/club';
import { getClubFromNotion } from '@/utils/api/club';

import { appInfo } from '../../config/appInfo';
import { backendConfig } from '../../config/backendConfig';

supertokens.init(backendConfig());

export default async function user(req: any, res: any) {
  // NOTE: We need CORS only if we are querying the APIs from a different origin
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: appInfo.websiteDomain,
    credentials: true,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
  });

  // we first verify the session
  await superTokensNextWrapper(
    async (next) => {
      return verifySession()(req, res, next);
    },
    req,
    res
  );

  // if it comes here, it means that the session verification was successful
  const userId = req.session.getUserId();
  const { metadata } = await UserMetadata.getUserMetadata(userId);
  const club: IClub | undefined = await getClubFromNotion(metadata.clubId);
  const userInfo = await EmailPassword.getUserById(userId);
  if (club && userInfo && metadata) {
    club.members = [
      {
        memberId: userId,
        email: userInfo.email,
        firstName: metadata.first_name || null,
        lastName: metadata.last_name || null,
        name: `${metadata.first_name || ''} ${metadata.last_name || ''}`,
      },
    ];
  }
  return res.json({
    metadata,
    club,
    userInfo,
    sessionHandle: req.session.getHandle(),
    accessTokenPayload: req.session.getAccessTokenPayload(),
  });
}

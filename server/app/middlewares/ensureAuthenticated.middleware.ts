import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "../../database/db-client";
import { H3Event } from "h3";
import { $st } from "~~/server/i18n/lib";

export async function ensureAuthenticated(
  event: H3Event,
  allowedRoles: number[] = []
): Promise<{
  user?: User;
  error?: object;
  isAdminOrEditor: () => boolean;
  isAdmin: () => boolean;
  isEditor: () => boolean;
  isUser: () => boolean;
  roleIn: (roles: number[]) => boolean;
}> {
  const tokenHeader = event.req.headers.authorization;

  const errorFunctions = {
    isAdmin: () => false,
    isAdminOrEditor: () => false,
    isEditor: () => false,
    isUser: () => false,
    roleIn: () => false,
  };

  if (!tokenHeader) {
    event.node.res.statusCode = 403;

    return {
      error: {
        message: $st(
          "ensure-authenticated.you_must_to_be_loggedin_to_make_this_action"
        ),
      },
      ...errorFunctions,
    };
  }

  const token = tokenHeader.split("Bearer ")[1];

  if (!token) {
    event.node.res.statusCode = 403;

    return {
      error: {
        message: $st(
          "ensure-authenticated.you_must_to_be_loggedin_to_make_this_action"
        ),
      },
      ...errorFunctions,
    };
  }

  const isSignedIn = jwt.verify(token, process.env.JWT_SECRET as string);

  if (!isSignedIn) {
    event.node.res.statusCode = 403;

    return {
      error: {
        message: $st(
          "ensure-authenticated.you_must_to_be_loggedin_to_make_this_action"
        ),
      },
      ...errorFunctions,
    };
  }

  const id = (isSignedIn as JwtPayload).id;

  const user = await prismaClient.user.findFirst({
    where: {
      id,
      status: {
        notIn: [0, 2],
      },
    },
  });

  if (!user) {
    event.node.res.statusCode = 403;

    return {
      error: {
        message: $st(
          "ensure-authenticated.probabily_your_user_has_been_deleted"
        ),
      },
      ...errorFunctions,
    };
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    event.node.res.statusCode = 403;

    return {
      error: {
        message: $st(
          "ensure-authenticated.you_are_not_allowed_to_do_this_action"
        ),
      },
      ...errorFunctions,
    };
  }

  function isAdminOrEditor() {
    return [1, 2].includes(user?.role || 3);
  }

  function isAdmin() {
    return [1].includes(user?.role || 3);
  }

  function isEditor() {
    return [2].includes(user?.role || 3);
  }

  function isUser() {
    return [3].includes(user?.role || 3);
  }

  function roleIn(roles: number[]) {
    return roles.includes(user?.role || 3) || false;
  }

  return { user, isAdminOrEditor, isAdmin, isEditor, isUser, roleIn };
}

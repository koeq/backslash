import { buildResponse } from "./build-response";

export const setAuthCookie = (statusCode: number, body: string | null) => {
  try {
    if (!body) {
      return buildResponse(500, "No body found");
    }

    const jwt = JSON.parse(body);

    // TO DO: CHECK
    // is SameSite=none safe?
    const cookie = {
      "Set-Cookie": `user=${jwt}; Max-Age=${
        5 * 60
      }; Secure; HttpOnly; SameSite=none`,
    };

    return buildResponse(statusCode, "auth cookie was set", cookie);
  } catch (err) {
    return buildResponse(500, "Couldn't set auth cookie");
  }
};

export function decodeToken(token: string): any {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
}

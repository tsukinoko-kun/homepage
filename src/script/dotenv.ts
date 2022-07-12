export const dotenv = {
  production:
    document.location.hostname !== "localhost" &&
    document.location.hostname !== "127.0.0.1" &&
    document.location.protocol !== "http:",
} as Readonly<{
  production: boolean;
}>;

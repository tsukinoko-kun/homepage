import { isProduction } from "./isProduction"

export const getOrigin = (): string => {
    return isProduction() ? "https://www.frank-mayer.io" : "http://localhost:3000"
}

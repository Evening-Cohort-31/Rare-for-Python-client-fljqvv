import { fetchJson } from "./apiSettings";

export function getAvatars() {
    return fetchJson("/avatars");
}
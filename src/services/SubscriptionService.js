import { deleteJson, fetchJson, postJson } from "./apiSettings";

export const getAllSubscriptions = () => {
    return fetchJson("/subscriptions");
};

export const subscribeToAuthor = (followerId,authorId, date) => {
  return postJson("/subscriptions", { 
    follower_id: followerId, 
    author_id: authorId, 
    created_on: date });
};

export const unsubscribeToAuthor = (subscriptionId) => {
    return deleteJson(`/subscriptions/${subscriptionId}`)

}


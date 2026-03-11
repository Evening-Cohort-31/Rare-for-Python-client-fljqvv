import { fetchJson, postJson, putJson, deleteJson } from "./apiSettings";

export function getDemotionQueueByTargetIdStatusPending(targetId) {
    return fetchJson(`/demotionQueue?target_id=${targetId}&status=pending`);
}

export function createDemotionQueueEntry(entry) {
    return postJson("/demotionQueue", entry);
}

export function updateDemotionQueueEntry(entryId, entryData) {
    return putJson(`/demotionQueue/${entryId}`, entryData);
}

export function deleteDemotionQueueEntry(id) {
    return deleteJson(`/demotionQueue/${id}`);
};
import { fetchJson, postJson, putJson, deleteJson } from "./apiSettings";

export const getAllDemotionQueueEntries = () => {
    return fetchJson("/demotionqueue")
}

export const getPendingDemotionQueueByTargetId = (targetAdminId) => {
    return fetchJson(`/demotionqueue?target_admin_id=${targetAdminId}&status=pending`)
}

export const getPendingDemotionQueueByInitiatorId = (initiatorId) => {
    return fetchJson(`/demotionqueue?initiator_id=${initiatorId}&status=pending`)
}

export function createDemotionQueueEntry(entry) {
    return postJson("/demotionqueue", entry);
}

export function updateDemotionQueueEntry(entryId, entryData) {
    return putJson(`/demotionqueue/${entryId}`, entryData);
}

export function deleteDemotionQueueEntry(id, initiatorId) {
    return deleteJson(`/demotionqueue/${id}?initiator_id=${initiatorId}`);
};
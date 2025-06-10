function mergeInteractions(listA, listB) {
    const map = new Map();

    for (const item of listA) {
        map.set(item.action, item);
    }

    for (const item of listB) {
        if (!map.has(item.action)) {
            map.set(item.action, item);
        } else {
            const existing = map.get(item.action);
            existing.success += (item.success);
            existing.failures += (item.failures);
        }
    }

    return Array.from(map.values());
}

function mergeProgressions(listA,listB){
    const map = new Map();

    for (const item of listA) {
        map.set(item.word, item);
    }

    for (const item of listB) {
        if (!map.has(item.word)) {
            map.set(item.word, item);
        } else {
            const existing = map.get(item.word);
            existing.completed = existing.completed || item.completed;
            existing.nbError += (item.nbError);
            existing.timeSpent += (item.timeSpent);
        }
    }

    return Array.from(map.values());
}

module.exports = {
    mergeProgressions,
    mergeInteractions,
}
function mergeInteractions(listA, listB) {
    const result = [...listA];

    for (const item of listB) {
        // Si l'interaction n’a pas de date, on lui en donne une
        if (!item.date) {
            item.date = new Date().toISOString();
        }

        // Vérifie s’il existe déjà une interaction exactement identique
        const existing = result.find(
            i => i.action === item.action && i.date === item.date
        );

        if (existing) {
            // Cumul des scores si interaction identique à la même date
            existing.success += item.success;
            existing.failures += item.failures;
        } else {
            // Sinon on l’ajoute telle quelle
            result.push(item);
        }
    }

    return result;
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
            existing.timeSpent = Math.min(item.timeSpent,existing.timeSpent);
        }
    }

    return Array.from(map.values());
}





module.exports = {
    mergeProgressions,
    mergeInteractions,
}
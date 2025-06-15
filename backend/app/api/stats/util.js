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
    const result = [...listA];

    for (const item of listB) {
        // Si l'interaction n’a pas de date, on lui en donne une
        if (!item.date) {
            item.date = new Date().toISOString();
        }

        // Vérifie s’il existe déjà une interaction exactement identique
        const existing = result.find(
            i => i.word === item.word && i.date === item.date
        );

        if (existing) {
            // Cumul des scores si interaction identique à la même date
            existing.nbError += item.nbError;
            existing.completed = item.completed;
            exisiting.timeSpent= Math.max(existing.timeSpent, existing.completed);
        } else {
            // Sinon on l’ajoute telle quelle
            result.push(item);
        }
    }

    return result;
}

function getAll(childId){
    
}





module.exports = {
    mergeProgressions,
    mergeInteractions,
}
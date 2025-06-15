const manageAllErrors = require('../../utils/routes/error-management');
const {Level} = require('../../models');

const getLevelByChildId = (req, res) => {
  try {
    const { childId } = req.params;        
    const levels   = Level.get();  //getAll plutôt          
    const childLvl = levels.find(l => l.childId == childId);

    if (!childLvl) {
      return res.status(404).json({ error: `No level for child ${childId}` });
    }

    res.status(200).json(childLvl);          
  } catch (err) {
    manageAllErrors(res, err);
  }
};

const createLevel = (req, res) => {
  try {
    const level = {
      childId: req.body.childId,  // Récupère l'ID de l'enfant depuis les paramètres de la requête
      niveau:req.body.niveau,
      date:new Date()

    }                         
    /*if (typeof niveau !== 'number' || isNaN(niveau)) {
      return res.status(400).json({ error: 'value must be a number' });
    }*/
    const newLevel = Level.create(level);  // Crée un nouveau niveau avec les données du corps de la requête
    res.status(201).json(newLevel);
  } catch (err) {
    manageAllErrors(res, err);
  }
};

const updateLevelByChildId = (req, res) => {
  try {
    const { childId } = req.params;
    const { niveau } = req.body;

    if (typeof niveau !== 'number') {
      return res.status(400).json({ error: 'Level must be a number' });
    }

    const existing = Level.get().find(l => l.childId == childId);
    if (!existing) return res.status(404).json({ error: 'Child not found' });

    const updated = Level.update(existing.id, { niveau });   // update par id
    res.status(200).json(updated);
  } catch (err) {
    manageAllErrors(res, err);
  }
};


const deleteLevelByChildId = (req, res) => {
     try {
    const existing = Level.getById(req.params);  // Recherche le niveau par childId
    if (!existing) return res.status(404).json({ error: 'Child not found' });

    const deleted = Level.delete(existing.id);  // Suppression par id, pas besoin de 'niveau' ici
    res.status(204).end();  // Pour DELETE, 204 No Content est plus adapté
  } catch (err) {
    manageAllErrors(res, err);
  }
};


module.exports = {
  getLevelByChildId,
  updateLevelByChildId,
    createLevel,
    deleteLevelByChildId
};
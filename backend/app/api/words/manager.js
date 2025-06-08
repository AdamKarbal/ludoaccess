const { Word } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');

const getAllWords = (req, res) => {
  console.log('getAllWords');
  try {
    console.log('getAllWords try');
    const words = Word.get();
    const { childId } = req.query;

    let filteredWords = words;
    if(childId){
      filteredWords = words.filter(w => !w.childId || w.childId == childId);
    }

    console.log('words', words);
    res.status(200).json(filteredWords);
  } catch (err) {
    manageAllErrors(res, err);
  }
};

const createWord = (req, res) => {
  try {
    const allWords = Word.get();
    const exists = allWords.find(w => w.value.toLowerCase() === req.body.value.toLowerCase() &&
        (w.childId === req.body.childId || !w.childId));
    if (exists) {
      return res.status(400).json({ error: 'Le mot existe déjà.' });
    }

    const newWord = {
      value: req.body.value.trim(),
      level: req.body.level,
      childId: req.body.childId || null
    };

    const created = Word.create(newWord);
    Word.save(allWords);
    res.status(201).json(created);
  } catch (err) {
    manageAllErrors(res, err);
  }
};

const createWords = (req, res) => {
  try {
    const words = req.body.words;

    if (!Array.isArray(words) || words.length === 0) {
      return res.status(400).json({ error: "Format attendu : { words: [...] }" });
    }

    const allWords = Word.get(); // Récupère les mots existants

    const newWords = words.filter(word => {
      const exists = allWords.find(w => w.value.toLowerCase() === word.value.toLowerCase() &&
          (w.childId === word.childId || !w.childId));
      return !exists; }).map(word => ({
      value: word.value.trim(),
      level: word.level,
      childId: word.childId || null,
    }));

    if (newWords.length === 0) {
      return res.status(400).json({ error: "Tous les mots existent déjà." });
    }

    newWords.forEach(word => Word.create(word)); // Ajoute chaque mot en base
    Word.save([...allWords, ...newWords]); // Met à jour le stockage

    console.log(`✅ Import de ${newWords.length} mots`);
    res.status(201).json({ message: `${newWords.length} mots importés avec succès.` });
  } catch (err) {
    manageAllErrors(res, err);
  }
};

const deleteWord = (req, res) => {
  try {
    const wordList = Word.get();
    const index = wordList.findIndex(w => w.value.toLowerCase() === req.params.wordValue.toLowerCase());

    if (index === -1) {
      return res.status(404).json({ error: 'Mot non trouvé.' });
    }

    wordList.splice(index, 1);
    Word.save(wordList);
    res.status(204).end();
  } catch (err) {
    manageAllErrors(res, err);
  }
};

module.exports = {
  getAllWords,
  createWord,
  deleteWord,
  createWords
};

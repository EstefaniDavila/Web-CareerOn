import { useState, useEffect } from 'react';

export const useQuests = () => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('careeron_quests');
    if (saved) {
      setQuests(JSON.parse(saved));
    }
  }, []);

  const addQuests = (newQuests) => {
    setQuests(prev => {
      const current = [...prev];
      newQuests.forEach(nq => {
        if (!current.find(q => q.skill === nq.skill)) {
          current.push(nq);
        }
      });
      localStorage.setItem('careeron_quests', JSON.stringify(current));
      return current;
    });
  };

  const completeQuest = (skill) => {
    setQuests(prev => {
      const updated = prev.map(q => q.skill === skill ? { ...q, completed: true } : q);
      localStorage.setItem('careeron_quests', JSON.stringify(updated));
      return updated;
    });
  };

  return { quests, addQuests, completeQuest };
};

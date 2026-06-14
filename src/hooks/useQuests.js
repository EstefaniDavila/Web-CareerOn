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
      let current = [...prev];
      newQuests.forEach(nq => {
        if (!current.find(q => q.skill === nq.skill) && current.length < 3) {
          current.push(nq);
        }
      });
      localStorage.setItem('careeron_quests', JSON.stringify(current));
      return current;
    });
  };

  const completeQuest = async (skill, score = 100) => {
    try {
      const token = localStorage.getItem('careeron_token');
      const backend_host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:8000";
      await fetch(`${backend_host}/api/student/skill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: skill, level: 'Básico' })
      });
      // Marcar como completada y guardar score
      setQuests(prev => {
        const updated = prev.map(q => q.skill === skill ? { ...q, completed: true, score } : q);
        localStorage.setItem('careeron_quests', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error("Error al completar misión", err);
    }
  };

  const cancelQuest = (skill) => {
    setQuests(prev => {
      const updated = prev.filter(q => q.skill !== skill);
      localStorage.setItem('careeron_quests', JSON.stringify(updated));
      return updated;
    });
  };

  return { quests, addQuests, completeQuest, cancelQuest };
};

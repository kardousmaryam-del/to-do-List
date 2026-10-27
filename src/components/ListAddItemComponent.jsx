import React, { useState } from 'react';
import './ListAddItemComponent.css';

/**
 * 3. ListAddItemComponent (Composant Enfant)
 * Gère le formulaire pour ajouter de nouveaux éléments à la liste via onAddItem.
 */
function ListAddItemComponent({ onAddItem }) {
  const [text, setText] = useState('');
  const [isEmptyError, setIsEmptyError] = useState(false);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    const trimmed = text.trim();
    if (!trimmed) {
      // Indiquer visuellement que le champ est vide
      setIsEmptyError(true);
      setTimeout(() => setIsEmptyError(false), 1200);
      return;
    }

    // Appeler la fonction du parent pour ajouter l'élément
    if (onAddItem) {
      onAddItem(trimmed);
    }

    // Vider le champ de saisie
    setText('');
    setIsEmptyError(false);
  };

  return (
    <form className="add-item-row" onSubmit={handleSubmit}>
      <input
        type="text"
        className={`add-input ${isEmptyError ? 'input-error' : ''}`}
        placeholder={isEmptyError ? "Écrivez une tâche ici..." : "Ajouter une tâche..."}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (isEmptyError) setIsEmptyError(false);
        }}
        autoFocus
      />
      <button
        type="button"
        className="add-button"
        onClick={handleSubmit}
        title="Ajouter"
        aria-label="Ajouter"
      >
        <svg
          className="plus-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </form>
  );
}

export default ListAddItemComponent;

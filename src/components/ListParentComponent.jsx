import React, { useState } from 'react';
import ListAddItemComponent from './ListAddItemComponent';
import ListItemComponent from './ListItemComponent';
import './ListParentComponent.css';

/**
 * 1. ListParentComponent (Composant Parent)
 * Gère la liste d'éléments dans son State et passe les callbacks aux enfants.
 */
function ListParentComponent() {
  const [items, setItems] = useState([
    { id: 1, text: 'Tâche 1' },
    { id: 2, text: 'Tâche 2' },
    { id: 3, text: 'Tâche 3' },
    { id: 4, text: 'Tâche 4' },
  ]);

  // Fonction de rappel pour l'ajout (Levée d'état depuis ListAddItemComponent)
  const handleAddItem = (newItemText) => {
    if (!newItemText || !newItemText.trim()) return;

    const newItem = {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      text: newItemText.trim(),
    };

    // Ajouter en haut de la liste pour qu'il soit immédiatement visible sous l'input
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  // Fonction de rappel pour la suppression (Levée d'état depuis ListItemComponent)
  const handleDeleteItem = (itemId) => {
    if (window.confirm('Êtes‑vous sûr de vouloir supprimer cet élément ?')) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  }


  return (
    <div className="todo-container">
      {/* 3. ListAddItemComponent : Formulaire d'ajout */}
      <ListAddItemComponent onAddItem={handleAddItem} />

      {/* 2. Liste des éléments ListItemComponent */}
      <div className="todo-list">
        {items.map((item) => (
          <ListItemComponent
            key={item.id}
            item={item}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default ListParentComponent;

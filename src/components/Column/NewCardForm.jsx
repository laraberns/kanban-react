import React, { useState } from 'react';

const NewCardForm = ({ onAddCard, columnId }) => {
    const [newCardInput, setNewCardInput] = useState('');

    const handleAddCard = () => {
        onAddCard(columnId, newCardInput);
        setNewCardInput('');
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Adicione um novo Card"
                value={newCardInput}
                onChange={(e) => setNewCardInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleAddCard}
                className="mt-2 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
            >
                Add Card
            </button>
        </div>
    );
};

export default NewCardForm;

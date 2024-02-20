import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function TaskActions({ onDelete, onEdit }) {
    return (
        <div className="flex items-center justify-end space-x-2">
            <button className="btn" onClick={onEdit} title="Editar">
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn" onClick={onDelete} title="Remover" style={{ color: 'red', borderRadius: '50%' }}>
                <FontAwesomeIcon icon={faTimesCircle} />
            </button>
        </div>
    );
}

export default function TaskActions({ onDelete, onEdit }) {
    return (
        <div>
            <button onClick={onDelete}>Excluir</button>
            <button onClick={onEdit}>Editar</button>
        </div>
    );
}

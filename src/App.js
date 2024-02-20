import './App.css';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import { Component } from 'react';

// Define a classe do componente principal da aplicação
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  // URL da API para obter todas as tarefas
  API_URL = 'http://localhost:3002/api/kanban/getalltasks';

  // Função assíncrona para atualizar as tarefas obtidas do servidor
  async refreshTasks() {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      // Atualiza o estado do componente com as tarefas obtidas
      this.setState({ tasks: data });
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  }

  // Função executada quando o componente é renderizado
  componentDidMount() {
    this.refreshTasks();
  }

  render() {
    const { tasks } = this.state;
    return (
      <div className="App">
        {/* Renderiza o componente KanbanBoard e passa as tarefas como propriedade */}
        <KanbanBoard tasks={tasks} />
      </div>
    );
  }
}

export default App;

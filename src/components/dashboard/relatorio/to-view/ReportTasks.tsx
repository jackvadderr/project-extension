import { CheckCircle } from 'lucide-react';

interface Task {
  description: string;
  completed: boolean;
}

const mockTasks: Task[] = [
  { description: 'Confirmar buffet para evento dia 10', completed: true },
  { description: 'Enviar contrato para Cliente B', completed: false },
  { description: 'Atualizar lista de fornecedores', completed: false },
  { description: 'Revisar feedbacks do último workshop', completed: true },
];

export default function ReportTasks() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5" />
        Tarefas Pendentes
      </h2>

      <ul className="space-y-2 text-sm">
        {mockTasks.map((task, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border ${
                task.completed ? 'bg-green-500 border-green-500' : 'bg-white'
              }`}
            ></div>
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}


import React from 'react';
import { format } from 'date-fns';
import { useTodo, Todo } from '@/contexts/TodoContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash } from 'lucide-react';

type TodoItemProps = {
  todo: Todo;
  onEdit: (todo: Todo) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const { toggleComplete, deleteTodo } = useTodo();

  return (
    <div 
      className={cn(
        "p-4 border rounded-lg mb-3 transition-all hover:shadow-md",
        todo.completed ? "bg-muted/50 border-muted" : "bg-card border-input",
        todo.category === 'urgent' ? "border-l-4 border-l-urgent" : "border-l-4 border-l-non-urgent"
      )}
    >
      <div className="flex items-start">
        <div className="flex-none pt-1">
          <Checkbox 
            checked={todo.completed} 
            onCheckedChange={() => toggleComplete(todo.id)}
          />
        </div>
        
        <div className="ml-3 flex-grow">
          <h3 className={cn(
            "text-lg font-medium",
            todo.completed && "line-through text-muted-foreground"
          )}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className={cn(
              "text-sm text-muted-foreground mt-1", 
              todo.completed && "line-through"
            )}>
              {todo.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center text-xs mt-2 space-x-2">
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              todo.category === 'urgent' ? 
                "bg-red-100 text-red-800" : 
                "bg-blue-100 text-blue-800"
            )}>
              {todo.category === 'urgent' ? 'Urgent' : 'Non-urgent'}
            </span>
            
            {todo.dueDate && (
              <span className="text-muted-foreground">
                Due: {format(todo.dueDate, 'MMM d, yyyy')}
              </span>
            )}
            
            <span className="text-muted-foreground">
              Created: {format(todo.createdAt, 'MMM d, yyyy')}
            </span>
          </div>
        </div>
        
        <div className="flex-none flex space-x-1">
          <Button variant="ghost" size="icon" onClick={() => onEdit(todo)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

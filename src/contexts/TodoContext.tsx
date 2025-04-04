
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export type Todo = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  category: 'urgent' | 'non-urgent';
  completed: boolean;
  createdAt: Date;
};

type TodoContextType = {
  todos: Todo[];
  isLoading: boolean;
  createTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load todos from localStorage
    const loadTodos = () => {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        // Parse dates correctly
        const parsedTodos = JSON.parse(storedTodos, (key, value) => {
          if (key === 'dueDate' || key === 'createdAt') {
            return value ? new Date(value) : null;
          }
          return value;
        });
        setTodos(parsedTodos);
      }
      setIsLoading(false);
    };

    loadTodos();
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const createTodo = async (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    try {
      setIsLoading(true);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTodo: Todo = {
        ...todo,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      setTodos(prev => [...prev, newTodo]);
      toast.success('Todo created successfully');
    } catch (error) {
      toast.error('Failed to create todo');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    try {
      setIsLoading(true);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, ...updates } : todo
        )
      );
      
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Failed to update todo');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTodos(prev => prev.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      await updateTodo(id, { completed: !todo.completed });
    } catch (error) {
      toast.error('Failed to update todo status');
      throw error;
    }
  };

  return (
    <TodoContext.Provider value={{ todos, isLoading, createTodo, updateTodo, deleteTodo, toggleComplete }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}

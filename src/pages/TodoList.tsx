
import React, { useState } from 'react';
import { useTodo, Todo } from '@/contexts/TodoContext';
import TodoItem from '@/components/TodoItem';
import TodoForm from '@/components/TodoForm';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const TodoList = () => {
  const { todos, isLoading } = useTodo();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'urgent' | 'non-urgent'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTodo(undefined);
  };

  const filteredTodos = todos
    .filter(todo => {
      // Apply status filter
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;
      
      // Apply category filter
      if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
      
      // Apply search filter
      if (searchQuery.trim() !== '' && 
          !todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !todo.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by completed status first
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      
      // Then sort by urgency
      if (a.category === 'urgent' && b.category !== 'urgent') return -1;
      if (a.category !== 'urgent' && b.category === 'urgent') return 1;
      
      // Finally sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Todos</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Todo
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Input
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={categoryFilter} onValueChange={(value: any) => setCategoryFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="non-urgent">Non-urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredTodos.length > 0 ? (
        <div className="space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onEdit={handleEdit} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No todos found.</p>
          {todos.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters.</p>
          )}
          {todos.length === 0 && (
            <Button 
              variant="outline" 
              onClick={() => setIsFormOpen(true)}
              className="mt-4"
            >
              Create your first todo
            </Button>
          )}
        </div>
      )}
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</DialogTitle>
          </DialogHeader>
          <TodoForm 
            editTodo={editingTodo} 
            onClose={handleCloseForm} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoList;

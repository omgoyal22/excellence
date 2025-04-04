
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useTodo } from '@/contexts/TodoContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CalendarView = () => {
  const { todos } = useTodo();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  // Get todos for the selected date
  const todosForSelectedDate = selectedDate 
    ? todos.filter(todo => 
        todo.dueDate && 
        format(todo.dueDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
    : [];

  // Create an array of dates that have todos
  const todoDates = todos
    .filter(todo => todo.dueDate)
    .map(todo => format(todo.dueDate!, 'yyyy-MM-dd'));

  // Remove duplicates
  const uniqueTodoDates = [...new Set(todoDates)];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Calendar View</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Task Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-4"
                modifiers={{
                  hasTodo: uniqueTodoDates.map(date => new Date(date)),
                }}
                modifiersStyles={{
                  hasTodo: {
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate 
                  ? `Tasks for ${format(selectedDate, 'MMMM d, yyyy')}` 
                  : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todosForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {todosForSelectedDate.map(todo => (
                    <div key={todo.id} className="border-l-2 pl-3 py-1 space-y-1" 
                      style={{ borderLeftColor: todo.category === 'urgent' ? '#EF4444' : '#3B82F6' }}>
                      <h3 className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="text-sm text-muted-foreground">
                          {todo.description}
                        </p>
                      )}
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{todo.category === 'urgent' ? 'Urgent' : 'Normal'}</span>
                        <span>{todo.completed ? 'Completed' : 'Pending'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  {selectedDate 
                    ? 'No tasks scheduled for this date.' 
                    : 'Please select a date to view tasks.'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

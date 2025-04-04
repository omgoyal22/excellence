
import React from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { todos } = useTodo();
  const { user } = useAuth();

  // Calculate stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const urgentTodos = todos.filter(todo => todo.category === 'urgent' && !todo.completed).length;
  const completionRate = totalTodos ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Calculate completion progress
  const todosWithDueDate = todos.filter(todo => todo.dueDate);
  const todosWithDueDateCompleted = todosWithDueDate.filter(todo => todo.completed);
  const dueDateCompletionRate = todosWithDueDate.length 
    ? Math.round((todosWithDueDateCompleted.length / todosWithDueDate.length) * 100) 
    : 0;

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.username}!</p>
        </div>
        <Button asChild>
          <Link to="/todos">View All Todos</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CardDescription>All of your created tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTodos}</div>
            <Progress value={completionRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completionRate}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Urgent Tasks</CardTitle>
            <CardDescription>High priority tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urgentTodos}</div>
            <div className="h-2"></div>
            <p className="text-xs text-muted-foreground mt-1">
              {urgentTodos > 0 
                ? `You have ${urgentTodos} urgent ${urgentTodos === 1 ? 'task' : 'tasks'} to complete` 
                : 'No urgent tasks pending!'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CardDescription>Tasks completed vs pending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTodos} / {totalTodos}</div>
            <Progress value={completionRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completionRate}% overall completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recently created and completed tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {todos.length > 0 ? (
              <div className="space-y-4">
                {todos.slice(0, 5).map(todo => (
                  <div key={todo.id} className="flex items-start">
                    <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${todo.completed ? 'bg-green-500' : todo.category === 'urgent' ? 'bg-urgent' : 'bg-non-urgent'}`} />
                    <div>
                      <p className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {todo.category === 'urgent' ? 'Urgent' : 'Normal'} • 
                        {todo.completed ? ' Completed' : ' In progress'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No tasks created yet.</p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link to="/todos">Create your first task</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Task Breakdown</CardTitle>
            <CardDescription>Your tasks categorized by status and priority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex flex-col items-center justify-center text-muted-foreground">
              <BarChart size={64} strokeWidth={1} />
              <p className="mt-4 text-center">Detailed analytics will be available soon!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Settings = () => {
  const { user, logout } = useAuth();
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password updated successfully');
  };
  
  const handleDeleteData = () => {
    toast.error('This feature is not implemented yet');
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveProfile}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={user?.username} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <form onSubmit={handleChangePassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Update Password</Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Sign out of your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={logout}>Sign Out</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage your todo data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Export Data</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Download all your todo data as a JSON file
                </p>
                <Button variant="outline">Export Todos</Button>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Delete Data</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  This will permanently remove all your todos
                </p>
                <Button variant="destructive" onClick={handleDeleteData}>
                  Delete All Todos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TodoList } from "@/components/TodoList";
import { AppSidebar } from "@/components/AppSidebar";
import { auth } from "@/lib/firebase-client";
import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
    });
  }, []);

  return (
    <AppSidebar>
      <h1 className="text-3xl font-extrabold my-3">
        Seize the day, {user?.displayName}
      </h1>
      <div className="flex flex-wrap gap-5">
        {user && (
          <Card className="w-md">
            <CardHeader>
              <CardTitle>Todos</CardTitle>
            </CardHeader>
            <CardContent>
              <TodoList userId={user.uid} />
            </CardContent>
          </Card>
        )}
      </div>
    </AppSidebar>
  );
}

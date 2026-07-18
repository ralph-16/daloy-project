import { LoginButton } from '@/components/LoginButton'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/*
TODOS:
Habit tracker (same pattern, different field shape)
Pomodoro timer (local state, no Firestore)
Dashboard page wiring all three together
Design pass at the end
*/

export default function Home() {
  return (
    <div className="flex flex-col bg-blue-100 items-center justify-center gap-5 min-h-screen">
      <h1 className="text-5xl font-extrabold text-blue-600">Daloy</h1>
      <Card className="w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Stay productive. Sign in with the account you already have.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <LoginButton />
        </CardFooter>
      </Card>
    </div>
  );
}

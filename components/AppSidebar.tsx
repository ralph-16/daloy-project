import { LoginButton } from "@/components/LoginButton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { House, ListChecks, Timer, Repeat2 } from "lucide-react";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h1 className="text-3xl font-extrabold text-blue-600">Daloy</h1>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            <House />
            Home
          </Button>
          <Button variant="ghost" onClick={() => router.push("/todos")}>
            <ListChecks />
            Todos
          </Button>
          <Button variant="ghost" onClick={() => router.push("/habits")}>
            <Repeat2 />
            Habits
          </Button>
          <Button variant="ghost">
            <Timer />
            Focus Timer
          </Button>
        </SidebarContent>
        <SidebarFooter>
          <LoginButton />
        </SidebarFooter>
      </Sidebar>
      <main className="bg-blue-100 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

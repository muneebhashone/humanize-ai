import { AgentCard } from "./AgentCard";

const agents = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    role: "Senior Agent",
    status: "online",
    calls_today: 45,
    success_rate: "78%",
    avg_duration: "4:30",
    avatar: "/avatars/01.png",
    color: "from-green-600 to-emerald-600",
  },
  {
    id: 2,
    name: "Michael Lee",
    email: "michael.l@example.com",
    role: "Agent",
    status: "on_call",
    calls_today: 32,
    success_rate: "65%",
    avg_duration: "5:15",
    avatar: "/avatars/02.png",
    color: "from-yellow-600 to-amber-600",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@example.com",
    role: "Team Lead",
    status: "break",
    calls_today: 28,
    success_rate: "82%",
    avg_duration: "3:45",
    avatar: "/avatars/03.png",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 4,
    name: "James Taylor",
    email: "james.t@example.com",
    role: "Senior Agent",
    status: "online",
    calls_today: 38,
    success_rate: "75%",
    avg_duration: "4:10",
    avatar: "/avatars/04.png",
    color: "from-violet-600 to-purple-600",
  },
  {
    id: 5,
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    role: "Agent",
    status: "on_call",
    calls_today: 29,
    success_rate: "70%",
    avg_duration: "4:45",
    avatar: "/avatars/05.png",
    color: "from-pink-600 to-rose-600",
  },
  {
    id: 6,
    name: "Daniel Kim",
    email: "daniel.k@example.com",
    role: "Agent",
    status: "break",
    calls_today: 25,
    success_rate: "68%",
    avg_duration: "5:00",
    avatar: "/avatars/06.png",
    color: "from-orange-600 to-red-600",
  },
];

export function AgentList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
} 
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function AgentSearch() {
  return (
    <Card className="border-0 bg-background p-4">
      <div className="flex space-x-2">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search agents..." className="pl-8" />
          </div>
        </div>
        <Button variant="outline">Filters</Button>
      </div>
    </Card>
  );
} 
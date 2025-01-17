"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateAgentMutation, useUpdateAgentMutation } from "@/hooks/mutations/use-agent-mutations"
import { Agent, CreateAgentData } from "@/types"
import { Textarea } from "../ui/textarea"
import { MultiSelect } from "../ui/multi-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  persona: z.string().min(10, "Persona must be at least 10 characters"),
  voip_no: z.string().min(10, "VOIP number must be at least 10 characters"),
  dept: z.string().min(2, "Department must be at least 2 characters"),
  tools: z.array(z.string()).optional(),
  status: z.string(),
})

const tools = [
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Chat", value: "chat" },
  { label: "Video", value: "video" },
]
const statuses = [
  { label: "On Call", value: "on call" },
  { label: "Available", value: "available" },
  { label: "Sleep", value: "sleep" },
]

interface AgentModalProps {
  agent?: Agent | null
  onClose?: () => void
}

export function AgentModal({ agent, onClose }: AgentModalProps) {
  const createAgent = useCreateAgentMutation()
  const updateAgent = useUpdateAgentMutation()

  const form = useForm<CreateAgentData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      persona: "",
      voip_no: "",
      dept: "",
      tools: [],
      status: "active",
    },
  })


  function onSubmit(values: CreateAgentData) {
    if (agent) {
      updateAgent.mutate(
        { id: agent._id, data: values },
        {
          onSuccess: () => {
              form.reset()
              onClose?.()
          },
        }
      )
    } else {
      createAgent.mutate(values, {
        onSuccess: () => {
            form.reset()
            onClose?.()
        },
      })
    }
  }

  const isLoading = createAgent.isPending || updateAgent.isPending

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      onClose?.()
    }
  }

  useEffect(() => {
    if (agent) {
      form.reset(agent)
    }
  }, [agent, form])

  return (
    <Dialog defaultOpen={agent ? true : false} modal={true} onOpenChange={handleOpenChange}>
   
        <DialogTrigger asChild>
          <Button className={cn(agent && "hidden")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        </DialogTrigger>
    
      <DialogContent className="sm:max-w-[500px]" >
        <DialogHeader>
          <DialogTitle>{agent ? "Edit Agent" : "Add New Agent"}</DialogTitle>
          <DialogDescription>
            {agent ? "Update the agent details below." : "Fill in the details below to create a new agent."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter agent name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter agent email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="persona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Persona</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter agent persona" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voip_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VOIP Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter VOIP number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tools</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={tools}
                      selected={field.value || []}
                      onChange={field.onChange}
                      placeholder="Select tools"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
            <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : agent ? "Save Changes" : "Create Agent"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 
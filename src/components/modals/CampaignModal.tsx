"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
} from "@/hooks/mutations/use-campaign-mutations";
import { Textarea } from "../ui/textarea";
import { MultiSelect } from "../ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2, PlusCircle } from "lucide-react";
import { useAgentsQuery } from "@/hooks/queries/use-agent-queries";
import { useEffect, useState } from "react";
import { Lead, useLeadsQuery } from "@/hooks/queries/use-leads-queries";

interface Agent {
  _id: string;
  name: string;
  email: string;
}

interface Campaign {
  _id: string;
  name: string;
  description: string;
  leads: Lead[];
  agents_ids: Agent[];
  status: string;
  knowledge_base: string;
  documents_index: string;
  createdAt: string;
  updatedAt: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  leads: z.array(z.string()).min(1, "Select at least one lead"),
  agents_ids: z.array(z.string()).min(1, "Select at least one agent"),
  status: z.string(),
  knowledge_base: z.string(),
  documents_index: z.string(),
});

const knowledgeBaseOptions = [
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
  { label: "Support", value: "support" },
];

const statusOptions = [
  { label: "Progress", value: "progress" },
  { label: "Stop", value: "stop" },
  { label: "Completed", value: "completed" },
];

interface CampaignModalProps {
  campaign?: Campaign;
  onOpenChange?: (open: boolean) => void;
}

export function CampaignModal({ campaign, onOpenChange }: CampaignModalProps) {
  const [open, setOpen] = useState(false);
  const createCampaign = useCreateCampaignMutation();
  const updateCampaign = useUpdateCampaignMutation();
  const { data: agents } = useAgentsQuery();
  const { data: leads } = useLeadsQuery();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      leads: [],
      agents_ids: [],
      status: "stop",
      knowledge_base: "sales",
      documents_index: "",
    },
  });

  useEffect(() => {
    if (campaign) {
      form.reset({
        name: campaign.name,
        description: campaign.description,
        leads: campaign.leads.map((lead) => lead._id),
        agents_ids: campaign.agents_ids.map((agent) => agent._id),
        status: campaign.status,
        knowledge_base: campaign.knowledge_base,
        documents_index: campaign.documents_index,
      });
    }
  }, [campaign, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (campaign) {
      updateCampaign.mutate(
        {
          id: campaign._id,
          data: {
            name: values.name,
            description: values.description,
            leads: values.leads,
            agents_ids: values.agents_ids,
            status: values.status,
            knowledge_base: values.knowledge_base,
            documents_index: values.documents_index,
          },
        },
        {
          onSuccess: () => {
            form.reset();
            setOpen(false);
            onOpenChange?.(false);
          },
        }
      );
    } else {
      createCampaign.mutate(
        {
          ...values,
        },
        {
          onSuccess: () => {
            form.reset();
            setOpen(false);
            onOpenChange?.(false);
          },
        }
      );
    }
  }

  const isLoading = createCampaign.isPending || updateCampaign.isPending;

  const agentOptions =
    agents?.map((agent: Agent) => ({
      label: agent.name,
      value: agent._id,
    })) || [];

  const leadOptions =
    leads?.map((lead: Lead) => ({
      label: lead.name,
      value: lead._id,
    })) || [];

  return (
    <Dialog open={campaign ? !!campaign : open} onOpenChange={handleOpenChange}>
      {!campaign && (
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {campaign ? "Edit Campaign" : "Create New Campaign"}
          </DialogTitle>
          <DialogDescription>
            {campaign
              ? "Update campaign details below."
              : "Fill in the details below to create a new campaign."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter campaign name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter campaign description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agents_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Agents</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={agentOptions}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select agents"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leads"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leads</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={leadOptions}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select leads"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((status) => (
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
              <FormField
                control={form.control}
                name="knowledge_base"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Knowledge Base</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select knowledge base" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {knowledgeBaseOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="documents_index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documents Index</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter documents index" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? campaign
                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    : <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  : campaign
                  ? "Update Campaign"
                  : "Create Campaign"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

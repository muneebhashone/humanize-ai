"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Users, PhoneCall, Loader2, PhoneOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useStartCallMutation,
  useEndCallMutation,
} from "@/hooks/mutations/use-call-mutations";
import { useCampaignsQuery } from "@/hooks/queries/use-campaign-queries";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const formSchema = z.object({
  phone: z.string().min(8, "Phone must be at least 8 characters").max(15, "Phone must be at most 15 characters"),
  campaignId: z.string({
    required_error: "Please select a campaign.",
  }),
  agentId: z.string({
    required_error: "Please select an agent.",
  }),
});

interface NewCallModalProps {
  trigger: React.ReactNode;
}

export function NewCallModal({ trigger }: NewCallModalProps) {
  const [open, setOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      campaignId: "",
      agentId: "",
    },
  });

  const { data: campaigns, isLoading: isLoadingCampaigns } =
    useCampaignsQuery();
  

  // Get selected campaign
  const selectedCampaign = campaigns?.find(
    (c) => c._id === form.watch("campaignId")
  );

  // Filter phone numbers based on selected campaign
  const phoneOptions =
    selectedCampaign?.leads.map((lead) => ({
      label: `${lead.name} - ${lead.phone}`,
      value: lead.phone,
    })) || [];

  // Filter agents based on selected campaign
  const agentOptions =
    selectedCampaign?.agents_ids.map((agent) => ({
      label: agent.name,
      value: agent._id,
    })) || [];

  // Reset phone and agent when campaign changes
  useEffect(() => {
    form.setValue("phone", "");
    form.setValue("agentId", "");
  }, [form.watch("campaignId"), form]);

  const { mutate: startCall, isPending: isStarting } = useStartCallMutation({
    onSuccess: () => {
      toast.success("Call started successfully");
      setActiveCall(form.getValues().phone); // Store active call phone number
    },
    onError: (error) => {
      toast.error("Failed to start call: " + error.message);
    },
  });

  const { mutate: endCall, isPending: isEnding } = useEndCallMutation({
    onSuccess: () => {
      toast.success("Call ended successfully");
      setActiveCall(null); // Clear active call
      setOpen(false); // Close modal
      form.reset(); // Reset form
    },
    onError: (error) => {
      toast.error("Failed to end call: " + error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startCall(values);
  }

  function handleEndCall() {
    if (activeCall) {
      endCall({ phone: activeCall });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-500/10">
              <PhoneCall className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">New Call</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Configure and start a new outbound call
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 py-4"
          >
            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Phone className="h-4 w-4" />
                Contact Details
              </div>
              <Separator />
              <FormField
                control={form.control}
                name="campaignId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Campaign</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a campaign" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingCampaigns ? (
                          <div className="flex items-center justify-center p-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : campaigns?.length === 0 ? (
                          <div className="p-2 text-sm text-muted-foreground">
                            No campaigns found
                          </div>
                        ) : (
                          campaigns?.map((campaign) => (
                            <SelectItem key={campaign._id} value={campaign._id}>
                              {campaign.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!form.watch("campaignId")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select phone number" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {phoneOptions.length === 0 ? (
                          <div className="p-2 text-sm text-muted-foreground">
                            No phone numbers available
                          </div>
                        ) : (
                          phoneOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.value}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Campaign Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                Campaign & Agent Settings
              </div>
              <Separator />
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="agentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Agent</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!form.watch("campaignId")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an agent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {agentOptions.length === 0 ? (
                            <div className="p-2 text-sm text-muted-foreground">
                              No agents available
                            </div>
                          ) : (
                            agentOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              {!activeCall ? (
                <>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white gap-2"
                    disabled={isStarting}
                  >
                    <Phone className="h-4 w-4" />
                    {isStarting ? "Starting Call..." : "Start Call"}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full gap-2"
                  onClick={handleEndCall}
                  disabled={isEnding}
                >
                  <PhoneOff className="h-4 w-4" />
                  {isEnding ? "Ending Call..." : "End Call"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

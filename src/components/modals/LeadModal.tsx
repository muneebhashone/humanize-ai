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
import { useCreateLeadMutation, useUpdateLeadMutation } from "@/hooks/mutations/use-leads-mutations"
import { useEffect, useState } from "react"
import { Users } from "lucide-react"

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  address: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  dob: z.string().transform((str) => new Date(str).toISOString()),
})

interface LeadModalProps {
  lead?: Lead;
  onOpenChange?: (open: boolean) => void;
}

export function LeadModal({ lead, onOpenChange }: LeadModalProps) {
  const [open, setOpen] = useState(false);
  const createLead = useCreateLeadMutation();
  const updateLead = useUpdateLeadMutation();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      country: "",
      address: "",
      dob: new Date().toISOString().split('T')[0],
    },
  })

  useEffect(() => {
    if (lead) {
      form.reset({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        city: lead.city,
        country: lead.country,
        address: lead.address,
        dob: new Date(lead.dob).toISOString().split('T')[0],
      })
    }
  }, [lead, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      dob: new Date(values.dob).toISOString()
    };

    if (lead) {
      updateLead.mutate({
        id: lead._id,
        data: formattedValues
      }, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
          onOpenChange?.(false);
        },
      });
    } else {
      createLead.mutate(formattedValues, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
          onOpenChange?.(false);
        },
      });
    }
  }

  const isLoading = createLead.isPending || updateLead.isPending;

  return (
    <Dialog open={lead ? !!lead : open} onOpenChange={handleOpenChange}>
      {!lead && (
        <DialogTrigger asChild>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{lead ? "Edit Lead" : "Add New Lead"}</DialogTitle>
          <DialogDescription>
            {lead ? "Update lead details below." : "Fill in the details below to add a new lead."}
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
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
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
                      <Input placeholder="Enter email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? (lead ? "Updating..." : "Creating...") : (lead ? "Update Lead" : "Create Lead")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 
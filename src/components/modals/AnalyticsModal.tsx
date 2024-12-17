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
import { BarChart3, Calendar, Filter, ArrowRight } from "lucide-react";
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

const formSchema = z.object({
  analyticsType: z.string({
    required_error: "Please select an analytics type.",
  }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  visualization: z.string({
    required_error: "Please select a visualization type.",
  }),
  comparison: z.string({
    required_error: "Please select a comparison type.",
  }),
});

interface AnalyticsModalProps {
  trigger: React.ReactNode;
}

export function AnalyticsModal({ trigger }: AnalyticsModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      analyticsType: "",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      visualization: "",
      comparison: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle analytics view logic here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-500/10">
              <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">View Analytics</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Analyze performance metrics and insights
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
            {/* Analytics Type Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                Analytics Type
              </div>
              <Separator />
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="analyticsType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Metrics</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose analytics type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="call-metrics">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              Call Metrics
                            </div>
                          </SelectItem>
                          <SelectItem value="agent-insights">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              Agent Insights
                            </div>
                          </SelectItem>
                          <SelectItem value="campaign-performance">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-purple-500" />
                              Campaign Performance
                            </div>
                          </SelectItem>
                          <SelectItem value="conversion-rates">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-yellow-500" />
                              Conversion Rates
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Time Period */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Time Period
              </div>
              <Separator />
              
            </div>

            {/* View Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" />
                View Options
              </div>
              <Separator />
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="visualization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visualization Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visualization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="table">Data Table</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comparison"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comparison</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select comparison" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="previous-period">Previous Period</SelectItem>
                          <SelectItem value="year-over-year">Year over Year</SelectItem>
                          <SelectItem value="target">Against Target</SelectItem>
                          <SelectItem value="none">No Comparison</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white gap-2"
              >
                <ArrowRight className="h-4 w-4" />
                View Analytics
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 
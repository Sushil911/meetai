"use client"
import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps {
    onSuccess?: ()=> void,
    onCancel?: ()=> void,
    initialValues?: AgentGetOne
}

export const AgentForm = ({onSuccess,onCancel,initialValues}:AgentFormProps) => {
    const trpc= useTRPC()
    const queryClient= useQueryClient()
    
    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                )

                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id:initialValues.id})
                    )
                }
                onSuccess?.()
            },
            onError: (error) => {
                toast.error(error.message)
                // TODO: Check if error code is "FORBIDDEN" redirect to /upgrade
            }
        })
    )

    const form=useForm<z.infer<typeof agentsInsertSchema>>({
        resolver:zodResolver(agentsInsertSchema),
        defaultValues:{
            name:initialValues?.name??"",
            instructions:initialValues?.instructions??""
        }
    })

    const isEdit = !!initialValues?.id
    const isPending= createAgent.isPending

    const onSubmit = (values:z.infer<typeof agentsInsertSchema>) => {
        if(isEdit) {
            console.log("TODO: updateAgent")
        } else {
            createAgent.mutate(values)
        }
    }

    return (    
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <GeneratedAvatar
                seed={form.watch("name")}
                variant="botttsNeutral"
                className="border size-16"
                />
                <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Math tutor" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="instructions"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                        <Textarea
                        placeholder="You are a helpful math assistant that can answer questions and help with assignments"
                        {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div>
                    {onCancel && (
                        <Button
                        variant="ghost"
                        disabled={isPending}
                        type="button"
                        onClick={()=> onCancel()}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button disabled={isPending} type="submit">
                        {isEdit ? "Update":"Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
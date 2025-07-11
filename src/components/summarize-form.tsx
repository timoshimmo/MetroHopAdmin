'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from "@/hooks/use-toast"
import { handleSummarization } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2 } from 'lucide-react';

const initialState = {
  summary: '',
  error: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                </>
            ) : 'Summarize Case'}
        </Button>
    )
}

export function SummarizeForm() {
    const [state, formAction] = useFormState(handleSummarization, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.error,
            });
        }
    }, [state.error, toast]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <Bot className="size-5 text-primary"/>
                <CardTitle>Customer Service Summary</CardTitle>
            </CardHeader>
            <CardDescription className='px-6 pb-2'>
                Use AI to summarize customer support cases. Paste the full case details below.
            </CardDescription>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <Textarea
                        name="caseDetails"
                        placeholder="e.g., Customer reported bus #MT-2198 was 15 minutes late for the 8:30am pickup at Oak & Main. The delay was caused by unforeseen traffic due to a road closure on 5th Ave. We apologized and offered a ride credit. Customer was satisfied."
                        rows={6}
                        required
                        minLength={10}
                    />
                    <SubmitButton />
                </form>
                {state.summary && (
                    <div className="mt-6 rounded-lg border bg-secondary/50 p-4">
                        <h3 className="font-semibold text-lg text-secondary-foreground">AI Summary:</h3>
                        <p className="mt-2 text-secondary-foreground whitespace-pre-wrap">{state.summary}</p>

                    </div>
                )}
            </CardContent>
        </Card>
    );
}

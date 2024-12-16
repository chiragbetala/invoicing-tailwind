import { toast } from "svelte-sonner"
const toastStyles = {
    success: {
        toast: 'bg-green-400',
        title: 'text-green-400 text-2xl',
        description: 'bg-black',
        actionButton: 'bg-zinc-400',
        cancelButton: 'bg-orange-400',
        closeButton: 'bg-lime-400'
    },
    error: {
        toast: 'bg-red-400',
        title: 'text-red-400 text-2xl',
        description: 'bg-black',
        actionButton: 'bg-zinc-400',
        cancelButton: 'bg-orange-400',
        closeButton: 'bg-lime-400'
    }
}

export function showToast(styleType: keyof typeof toastStyles, title: string, description: string) {
    return toast(title, {
        description: description,
        action: {
            label: "X",
            onClick: () => console.info("CLOSE")
        },
        classes: toastStyles[styleType]
    });
}
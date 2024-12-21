declare module 'svelte-tags-input' {
    import { SvelteComponentTyped } from 'svelte';

    export interface TagsInputProps {
        tags?: string[];
        value?: string;
        placeholder?: string;
        allowPaste?: boolean;
        onlyUnique?: boolean;
        suggestions?: string[];
        addKeys?: number[];
        minChars?: number;
        saveOnBlur?: boolean;
        allowBlur?: boolean;
        class?: string;
    }

    export interface TagsInputEvents {
        tags: CustomEvent<{ tags: string[] }>;
        beforeAdd: CustomEvent<{ tag: string }>;
        input: CustomEvent<{ value: string }>;
    }

    export default class Tags extends SvelteComponentTyped<
        TagsInputProps,
        TagsInputEvents
    > {}
}

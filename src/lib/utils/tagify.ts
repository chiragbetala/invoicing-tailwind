import Tagify from '@yaireo/tagify';

/**
 * Creates a Tagify instance on the given input element with optional settings
 * @param {HTMLInputElement | HTMLTextAreaElement} inputElement - The input element to transform
 * @param {Object} settings - Optional Tagify settings
 * @returns {Tagify} The Tagify instance
 */
interface TagifyDropdownSettings {
    maxItems: number;
    classname: string;
    enabled: number;
    closeOnSelect: boolean;
}

interface TagifyConfig {
    maxTags: number;
    backspace: 'edit';
    placeholder: string;
    dropdown: TagifyDropdownSettings;
}

export function createTagify(
    inputElement: HTMLInputElement | HTMLTextAreaElement,
    settings: Partial<TagifyConfig> = {}
): Tagify {
    const defaultSettings: TagifyConfig = {
        maxTags: 10,
        backspace: "edit",
        placeholder: "Add tags...",
        dropdown: {
            maxItems: 20,
            classname: "tags-dropdown",
            enabled: 0,
            closeOnSelect: false
        }
    };

    const tagifySettings = { ...defaultSettings, ...settings };
    return new Tagify(inputElement, tagifySettings);
}

/**
 * Destroys a Tagify instance
 * @param {Tagify} tagifyInstance - The Tagify instance to destroy
 */
interface Destroyable {
    destroy(): void;
}

export function destroyTagify(tagifyInstance: Destroyable | undefined): void {
    if (tagifyInstance && typeof tagifyInstance.destroy === 'function') {
        tagifyInstance.destroy();
    }
}
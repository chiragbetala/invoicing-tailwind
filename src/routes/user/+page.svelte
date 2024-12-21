<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import * as Pagination from "$lib/components/ui/pagination";
    import * as Accordion from "$lib/components/ui/accordion/index";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import Tags from "svelte-tags-input";
    import { type PageData } from './$types';

    const { data } = $props<{ data: PageData }>();

    // Pagination logic using Runes
    let currentPage = $state(1);
    let itemsPerPage = $state(3);
    
    // Reactive computations using Runes
    let totalPages = $derived(Math.ceil(data.users.length / itemsPerPage));
    let paginatedUsers = $derived(data.users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ));

    // Tags input configuration
    interface User {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    }
    let tags = $state<string[]>([]);
    let inputValue = $state('');
    const userSuggestions = data.users.map((user: User) => `${user.first_name} ${user.last_name}`);

    function onBeforeAdd(event: CustomEvent) {
        const value = event.detail.tag.trim();
        const isValid = userSuggestions.includes(value);
        if (!isValid) {
            event.preventDefault();
        }
        return isValid;
    }

    function onTagAdd(event: CustomEvent) {
        tags = event.detail.tags;
        inputValue = '';
    }

    function onInput(event: CustomEvent) {
        inputValue = event.detail.value;
    }
</script>

<div class="container mx-auto py-10">
    <div class="mb-6 w-full sm:max-w-[70%]">
        <h3 class="mb-2 text-lg font-semibold">Select Users</h3>
        <div class="tags-container">
            <Tags 
                bind:tags
                bind:value={inputValue}
                on:tags={onTagAdd}
                on:beforeAdd={onBeforeAdd}
                on:input={onInput}
                placeholder="Search and select users..."
                allowPaste={false}
                onlyUnique={true}
                suggestions={userSuggestions.filter((s: string) => 
                    s.toLowerCase().includes(inputValue.toLowerCase()) && 
                    !tags.includes(s)
                )}
                addKeys={[13]}
                minChars={1}
                saveOnBlur={false}
                allowBlur={false}
                class="tags-input"
            />
        </div>
    </div>

    <Accordion.Root type="single" class="w-full sm:max-w-[70%]">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
          <Accordion.Content
            >Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content
          >
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Is it styled?</Accordion.Trigger>
          <Accordion.Content>
            Yes. It comes with default styles that matches the other components'
            aesthetic.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Is it animated?</Accordion.Trigger>
          <Accordion.Content>
            Yes. It's animated by default, but you can disable it if you prefer.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Carousel.Root class="w-full max-w-xs">
        <Carousel.Content>
          {#each data.users as user}
            <Carousel.Item>
              <div class="p-1">
                <Card.Root>
                  <Card.Header>
                    <Card.Title class="text-center">{user.first_name}</Card.Title>
                  </Card.Header>
                  <Card.Content class="flex items-center justify-center p-6">
                    <span class="text-sm">{user.email}</span>
                  </Card.Content>
                  <Card.Footer class="flex justify-center">
                    <span class="text-sm text-gray-600">{user.phone}</span>
                  </Card.Footer>
                </Card.Root>
              </div>
            </Carousel.Item>
          {/each}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel.Root>
    <div class="rounded-md border">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>First Name</Table.Head>
                    <Table.Head>Last Name</Table.Head>
                    <Table.Head>Email</Table.Head>
                    <Table.Head>Phone</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each paginatedUsers as user}
                    <Table.Row>
                        <Table.Cell>{user.first_name}</Table.Cell>
                        <Table.Cell>{user.last_name}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.phone}</Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>

    <div class="mt-4 flex justify-center">
        <Pagination.Root 
            count={data.users.length} 
            perPage={itemsPerPage} 
            bind:page={currentPage}
        >
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.PrevButton />
                </Pagination.Item>
                
                {#each Array(totalPages) as _, i}
                    <Pagination.Item>
                        <Pagination.Link page={{ value: i + 1 }} isActive={currentPage === i + 1} />
                    </Pagination.Item>
                {/each}
                
                <Pagination.Item>
                    <Pagination.NextButton />
                </Pagination.Item>
            </Pagination.Content>
        </Pagination.Root>
    </div>
</div>

<style>
    :global(.tags-container .svelte-tags-input-layout) {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;
    }

    :global(.tags-container .svelte-tags-input) {
        min-height: 40px;
    }

    :global(.tags-container .svelte-tags-input-tag) {
        background: #e2e8f0;
        border-radius: 0.25rem;
        padding: 2px 8px;
        margin: 2px;
    }

    :global(.tags-container .svelte-tags-input-layout .suggestions) {
        background: white;
        border: 1px solid #e2e8f0;
        border-top: none;
        border-radius: 0 0 0.375rem 0.375rem;
    }

    :global(.tags-container .svelte-tags-input-layout .suggestions li) {
        padding: 8px;
        cursor: pointer;
    }

    :global(.tags-container .svelte-tags-input-layout .suggestions li:hover) {
        background: #f7fafc;
    }
</style>

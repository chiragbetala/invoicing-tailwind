<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import * as Pagination from "$lib/components/ui/pagination";
    import * as Accordion from "$lib/components/ui/accordion/index";
    import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
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
</script>

<div class="container mx-auto py-10">
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

<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import * as Pagination from "$lib/components/ui/pagination";
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

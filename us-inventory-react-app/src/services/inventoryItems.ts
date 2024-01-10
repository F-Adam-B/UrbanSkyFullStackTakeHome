import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { formatTimestamp } from '../components/Table/BasicTable'
import { FormState } from '../components/Dialog/FormDialog'

export interface InventoryItem {
    id: number
    serial: string
    name: string
    description: string
    quantity: number,
    created_at: string
}

export type InventoryItemsResponse = {
    items: InventoryItem[] 
} 
// Define a service using a base URL and expected endpoints
export const itemInventoryApi = createApi({
  reducerPath: 'itemInventoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getInventoryItems: builder.query<InventoryItemsResponse, void>({
      query: () => 'api/inventory-items',
      providesTags: ["Items"],
      transformResponse: (response: InventoryItemsResponse, meta: undefined, arg: void):
      InventoryItemsResponse | Promise<InventoryItemsResponse> => {
      const transformedItems: InventoryItem[] = response.items.map(({created_at, ...rest}) => ({
        ...rest,
        created_at: formatTimestamp(created_at) // Adjust the transformation as necessary
      }));

      // Return an object that adheres to the InventoryItemsResponse interface
      return {
        items: transformedItems
      };
    }
    }),
    addNewItem: builder.mutation({
        // Specify the query for performing a POST request
        query: (newItem) => ({
          url: '/api/add-item',
          method: 'POST',
          body: newItem,
        }),
        invalidatesTags: ['Items']
      }),
    deleteInventoryItem: builder.mutation<void, number>({
        // Specify the query for performing a POST request
        query: (id) => ({
          url: `/api/inventory-items/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Items']
      }),
    updateItem: builder.mutation<void, FormState & { id?: number }>({
        // Specify the query for performing a POST request
        query: (updatedItem) => {
          console.log(updatedItem, 'updateditem')
          return {
            url: `/api/inventory-items/${updatedItem.id}`,
            method: 'PUT',
            body: updatedItem
          }

        }, 
        invalidatesTags: ['Items']
      }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDeleteInventoryItemMutation, useGetInventoryItemsQuery, useAddNewItemMutation, useUpdateItemMutation } = itemInventoryApi
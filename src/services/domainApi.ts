import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Domain } from "../types/Domain";

export const domainApi = createApi({
  reducerPath: "domainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/",
  }),
  tagTypes: ["Domain"],
  endpoints: (builder) => ({
    getDomains: builder.query<Domain[], void>({
      query: () => "/",
      providesTags: ["Domain"],
    }),
    getDomainById: builder.query<Domain, string>({
      query: (id) => `/${id}`,
    }),
    createDomain: builder.mutation<Domain, Partial<Domain>>({
      query: (newDomain) => ({
        url: "/",
        method: "POST",
        body: newDomain,
      }),
      invalidatesTags: ["Domain"],
    }),
    updateDomain: builder.mutation<
      Domain,
      { id: string; data: Partial<Domain> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Domain"],
    }),
    deleteDomain: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Domain"],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useGetDomainByIdQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainApi;

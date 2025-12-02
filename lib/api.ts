import { IUser } from "@/database/user.model";
import { fetchHandler } from "./handlers/fetch";
import { IAccount } from "@/database/account.model";
import { SignInWithOAuthParams } from "@/types/action";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  auth: {
    oAuthSignIn: ({
      user,
      provider,
      providerAccountId,
    }: SignInWithOAuthParams) => {
      return fetchHandler(`${API_BASE_URL}/auth/signin-with-oauth`, {
        method: "POST",
        body: JSON.stringify({ user, provider, providerAccountId }),
        timeout: 5000,
      });
    },
  },
  users: {
    getAll: () =>
      fetchHandler(`${API_BASE_URL}/users`, {
        timeout: 5000,
      }),
    getById: (id: string) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, { timeout: 5000 }),
    getByEmail: (email: string) =>
      fetchHandler(`${API_BASE_URL}/users/email`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    create: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    update: (id: string, userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),

    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      }),
  },
  accounts: {
    getAll: () => fetchHandler(`${API_BASE_URL}/accounts`),
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`),
    getByProvider: (providerAccountId: string) =>
      fetchHandler(`${API_BASE_URL}/accounts/provider`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
        timeout: 5000,
      }),
    create: (accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(accountData),
      }),
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),

    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: "DELETE",
      }),
  },
};

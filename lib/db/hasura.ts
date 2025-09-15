import { MagicUserMetadata } from "@magic-sdk/admin";

export default async function queryHasuraGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>,
  token: string
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });
  return await result.json();
}

export async function isNewUser(token: string,issuer: string) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;
  const response = await  queryHasuraGraphQL(operationsDoc, "isNewUser", {issuer},token);
  console.log("🚀 ~ isNewUser ~ response:", response?.data?.users?.length)
  return response?.data?.users?.length ===0;
}

export async function createNewUser(token: string,
  metaData: MagicUserMetadata) {
  const {email, issuer, publicAddress} = metaData;
  const operationsDoc = `
  mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;
  return await  queryHasuraGraphQL(operationsDoc, "createNewUser", {issuer, email, publicAddress},token);
}
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


export async function findVideoIdByUser(token: string,userId: string,videoId: string) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favourited
      userId
      videoId
      watched
    }
  }
`;
  const response = await  queryHasuraGraphQL(operationsDoc, "findVideoIdByUserId", {userId,videoId},token);
  return response?.data?.stats; 
}

export async function updateStats(token: string
  ,{userId,videoId, favourited,watched}
  : {userId: string,videoId: string,favourited: number,watched: boolean}) {
  const operationsDoc = `
  mutation updateStats($userId: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
    update_stats(where: {userId: {_eq: $userId }, videoId: {_eq: $videoId}}, _set: {favourited: $favourited, watched: $watched}) {
        returning {
          favourited
          id
          userId
          videoId
          watched
        }
      }
  }
`;
  const response = await  queryHasuraGraphQL(operationsDoc, "updateStats", {userId,videoId,favourited,watched},token);
  console.log("🚀 ~ updateStats ~ response:", {response});
  return response; 
}

export async function insertStats(token: string
  ,{userId,videoId, favourited,watched}
  : {userId: string,videoId: string,favourited: number,watched: boolean}) {
  const operationsDoc = `
  mutation insertStats($userId: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
    insert_stats_one(object: {favourited: $favourited, userId: $userId, videoId: $videoId, watched: $watched}) {
      favourited
      id
      userId
      videoId
      watched
    }
    
  }
`;
  const response = await  queryHasuraGraphQL(operationsDoc, "insertStats", {userId,videoId,favourited,watched},token);
  console.log("🚀 ~ updateStats ~ response:", {response});
  return response; 
}





import { client } from "..";

export async function find<T>(service: string, params?: any): Promise<Array<T>> {
  const items = await client.service(`api/${service}`).find(params);
  return items
}
import {
  delCustomer,
  getCustomer,
  getCustomerById,
  postCustomer,
  putCustomer,
} from "./methods";

export async function handler(event: any) {
  const { http } = event.requestContext;
  const { body } = event;
  let id: string;

  switch (http.method) {
    case "GET":
      if (http.path !== "/") {
        id = http.path.split("/")[1];
        return await getCustomerById(id);
      }
      return await getCustomer(body);

    case "POST":
      return await postCustomer(body);

    case "PUT":
      id = http.path.split("/")[1];
      return await putCustomer(id, body);

    case "DELETE":
      id = http.path.split("/")[1];
      return await delCustomer(id, body);

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({
          message: "Method not allowed",
        }),
      };
  }
}

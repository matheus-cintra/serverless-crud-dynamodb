export const serverResponse = (
  statusCode: number = 200,
  method: string,
  result: any
) => ({
  statusCode,
  method,
  body: JSON.stringify(result),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

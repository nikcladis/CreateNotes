export async function fetchData(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw new Error(errorMessage);
  }
}

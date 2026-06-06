/**
 * Builds a JSON Response from a Supabase query result.
 * Returns 500 on error, otherwise 200 with the data.
 */
export function dbResponse({
  data,
  error,
}: {
  data: unknown;
  error: { message: string } | null;
}) {
  if (error) {
    return new Response(
      JSON.stringify({
        message: 'Error fetching from database',
        error: error.message,
      }),
      { status: 500 }
    );
  }
  return new Response(JSON.stringify(data), { status: 200 });
}

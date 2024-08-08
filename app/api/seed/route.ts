import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabase = createClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export async function GET(req: Request, res: Response) {
    const rows: Database['public']['Tables']['sensor']['Insert'][] = Array.from({ length: 12 }).map(() => ({
        lumen: 15.5,
        moist: 12,
        soil: 20.3,
        temp: 19.45
    }));

    const { data, error } = await  supabase
        .from('sensor')
        .insert(rows);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Return success response
    return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
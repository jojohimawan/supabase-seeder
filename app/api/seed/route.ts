import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(req: Request, res: Response): Promise<Response> {
    console.log('Executing function...');

    const rows: Database['public']['Tables']['sensor']['Insert'][] = Array.from({ length: 8640 }).map(() => ({
        lumen: 15.5,
        moist: 12,
        soil: 20.3,
        temp: 19.45
    }));

    const { data, error } = await  supabase
        .from('sensor')
        .insert(rows);

    if (error) {
        console.error(`Failed to insert: ${error.message}`);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Return success response
    console.log('Successfully inserting data');
    return new Response(JSON.stringify({ data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
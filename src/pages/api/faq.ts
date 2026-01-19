import type { APIRoute } from "astro";
import { databases } from "../../lib/appwrite.server";
import { Query } from "appwrite";

export const GET: APIRoute = async () => {
    try {
        const res = await databases.listDocuments(
            import.meta.env.APPWRITE_DATABASE_ID,      // website
            import.meta.env.APPWRITE_FAQ_COLLECTION_ID, // faqs
            [
                Query.equal("isActive", true),
                Query.orderAsc("order"),
            ]
        );
        return new Response(
            JSON.stringify(res.documents),
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: "Failed to load FAQs" }),
            { status: 500 }
        );
    }
};

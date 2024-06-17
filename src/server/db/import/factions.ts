import "dotenv/config";
import { db } from "..";
import { factions } from "../schema";
import factionsJSON from "../../../../data/factions.json";

async function importFactions() {
	console.log("⏳ Importing factions...");
	const start = Date.now();

	const rows = await db.insert(factions)
		.values(
			factionsJSON.map(({ code, name, is_primary }) => ({
				code, name, is_primary
			}))
		)
		.onConflictDoNothing()
		.returning({ code: factions.code });

	const end = Date.now();
	console.log(`✅ ${rows.length} factions imported in ${end - start}ms\n`);
	process.exit(0);
}

importFactions().catch((err) => {
	console.error("❌ Import failed");
	console.error(err);
	process.exit(1);
});

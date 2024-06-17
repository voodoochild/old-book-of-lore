import "dotenv/config";
import { db } from "..";
import { cycles } from "../schema";

import cyclesJSON from "../../../../data/cycles.json";

async function importCycles() {
	console.log("⏳ Importing cycles...");
	const start = Date.now();

	const rows = await db.insert(cycles)
		.values(
			cyclesJSON.map(({ code, name, position }) => ({
				code, name, position
			}))
		)
		.onConflictDoNothing()
		.returning({ code: cycles.code });

	const end = Date.now();
	console.log(`✅ ${rows.length} cycles imported in ${end - start}ms\n`);
	process.exit(0);
}

importCycles().catch((err) => {
	console.error("❌ Import failed");
	console.error(err);
	process.exit(1);
});

import "dotenv/config";
import { db } from "..";
import { cycles, packs } from "../schema";

import packsJSON from "~/../data/packs.json";

async function importPacks() {
	console.log("⏳ Importing packs...");
	const start = Date.now();

	const allCycles = await db.select().from(cycles);
	const cyclePositionMap = new Map();
	allCycles.forEach(({ code, position }) => {
		cyclePositionMap.set(position, code);
	});

	const rows = await db.insert(packs)
		.values(
			packsJSON.map(({ code, name, position, cycle_position }) => {
				return {
					code,
					name,
					position,
					cycle_code: cyclePositionMap.get(cycle_position)
				};
			})
		)
		.onConflictDoNothing()
		.returning({ code: packs.code });

	const end = Date.now();
	console.log(`✅ ${rows.length} packs imported in ${end - start}ms\n`);
	process.exit(0);
}

importPacks().catch((err) => {
	console.error("❌ Import failed");
	console.error(err);
	process.exit(1);
});

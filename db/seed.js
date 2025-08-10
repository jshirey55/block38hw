import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await db.query("TRUNCATE playlists_tracks, playlists, users, tracks RESTART IDENTITY CASCADE");
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }

  const user1 = await createUser("seededuser1", "Password1")
  const playlist1 = await createPlaylist("Playlist1", "Jade", user1.id)
    for (let i = 1; i <= 5; i++){
      await createPlaylistTrack(playlist1.id, i);
  }
  const user2 = await createUser("seededuser2", "Password2")
  const playlist2 = await createPlaylist("Playlist2", "Josh", user2.id)
    for (let i = 6; i <= 10; i++){
      await createPlaylistTrack(playlist2.id, i);
  }
}



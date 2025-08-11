import db from "#db/client";

export async function createPlaylist(name, description, user_id) {
  const sql = `
  INSERT INTO playlists
    (name, description, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description, user_id]);
  return playlist;
}

export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getPlaylistByTrackIdAndUserId(trackId, userId) {
  const SQL =`
  SELECT *
  FROM playlists
  WHERE 
    track_id = $1
    AND user_id = $2
  `;
  const { rows: playlists } = await db.query(SQL, [trackId, userId])
  return playlists
}

export async function getPlaylistByUserId(userId) {
  const SQL =`
  SELECT *
  FROM playlists
  WHERE user_id = $1
  `;
  const { rows: playlists } = await db.query(SQL, [userId])
  return playlists
}

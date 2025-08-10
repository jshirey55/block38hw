import express from "express";
const router = express.Router();
export default router;

import { createPlaylist, getPlaylistByTrackIdAndUserId } from "#db/queries/playlists"
import { getTracks, getTrackById } from "#db/queries/tracks";
import requireUser from "#middleware/requireUser"
import requireBody from "#middleware/requireBody";

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.param("id", async (req, res, next, id) => {
  const track = await getTrackById(id)
  if (!track) return res.status(404).send("Track not found")
  req.track = track
  next();
})

router.route("/:id").get(async (req, res) => {
  const track = req.track

  if(req.user) {
    const playlists = await getPlaylistByTrackIdAndUserId(restraunt.id, req.user.id)
    track.playlists = playlists
  }
  res.send(playlists)
})

router
  .route("/:id/playlists")
  .post(requireUser, requireBody(["name", "description"]), async (req, res) => {
    const { name, description } = req.body
    const playlist = await createPlaylist(
      req.playlist.id,
      req.user.id,
      name,
      description,
    )
    res.status(201).send(playlist)
  })
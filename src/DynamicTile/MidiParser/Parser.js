import MidiParser from "midi-parser-js";
import { getSongData } from "./network";

export class Song {
  constructor(songId) {
    this.songId = songId;
    this.isParsed = false;
  }
  async parse() {
    await getSongData(this.songId).then((data) => {
      this._songData = data;
      this.parseFetchedData();
      this.assignJsonAsAttrs();
    });
    this.isParsed = true;
  }
  parseFetchedData() {
    this.midiParsed = MidiParser.parse(this._songData.midiBytes);
  }
  assignJsonAsAttrs() {
    // lifts the attributes in the json file to class attributes
    Object.keys(this._songData.json).forEach((i) => {
      this[i] = this._songData.json[i];
    });
  }
}

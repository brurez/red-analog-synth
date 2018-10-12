import cs from "classnames";
// @ts-ignore
import React from "react";

const notes = [
  ["", "C"],
  ["Db", "D"],
  ["Eb", "E"],
  ["", "F"],
  ["Gb", "G"],
  ["Ab", "A"],
  ["Bb", "B"]
];

const Key = ({ note, className }) => (
  <div key={note} className={cs("key", className)}>
    <span>{note}</span>
  </div>
);

const Octave = ({ octave }) => (
  <div key={octave} className="octave">
    {notes.map(note => (
      <React.Fragment>
        {note[0] && <Key note={note[0]} className="black" />}
        <Key note={note[1]} className="white" />
      </React.Fragment>
    ))}
  </div>
);

const MusicKeyboard = props => {
  return (
    <div className="music-keyboard">
      {[0, 1].map(octave => <Octave key={octave} octave={octave} />)}
    </div>
  );
};

export default MusicKeyboard;

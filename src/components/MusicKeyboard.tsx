// @ts-ignore
import React from "react";

const keys = [
  ["", "C"],
  ["Db", "D"],
  ["Eb", "E"],
  ["", "F"],
  ["Gb", "G"],
  ["Ab", "A"],
  ["Bb", "B"]
];

const MusicKeyboard = props => {
  return (
    <div className="music-keyboard">
      {[0, 1].map(octave => (
        <div key={octave} className="octave">
          {keys.map(key => (
            <React.Fragment>
              <div className="black keys">
                {key[0] && (
                  <div key={key[0]} className="key black">
                    <span>{key[0]}</span>
                  </div>
                )}
              </div>
              <div className="white keys">
                <div key={key[1]} className="key white">
                  <span>{key[1]}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MusicKeyboard;

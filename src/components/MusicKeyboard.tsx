import cs from "classnames";
import { observer } from "mobx-react";
import * as React from "react";
import AnalogSynth from "../audio/AnalogSynth";
import KeyboardInterface from "../KeyboardInterface";

const notes = [
  ["", "C"],
  ["Db", "D"],
  ["Eb", "E"],
  ["", "F"],
  ["Gb", "G"],
  ["Ab", "A"],
  ["Bb", "B"]
];

const Key = ({ note, className, pressed }) => {
  const styles = {
    backgroundColor: pressed && "gray"
  };
  return (
    <div key={note} className={cs("key", className)} style={styles}>
      <span>{note}</span>
    </div>
  );
};

interface IMKeyboardProps {
  synth: AnalogSynth;
  keyboard: KeyboardInterface;
}

@observer
class MusicKeyboard extends React.Component<IMKeyboardProps> {
  public render() {
    const {
      keyboard: { octave }
    } = this.props;

    return (
      <div className="music-keyboard">
        {[octave, octave + 1].map(oct => (
          <div key={oct} className="octave">
            {notes.map(note => (
              <React.Fragment>
                {note[0] && (
                  <Key
                    note={note[0]}
                    className="black"
                    pressed={this.isPressed(note[0], oct)}
                  />
                )}
                <Key
                  note={note[1]}
                  className="white"
                  pressed={this.isPressed(note[1], oct)}
                />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  }

  private isPressed(note, octave) {
    return this.props.synth.pressedKeys.indexOf(`${note}${octave}`) >= 0;
  }
}

export default MusicKeyboard;

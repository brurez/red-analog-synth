import cs from "classnames";
import { observer } from "mobx-react";
import * as React from "react";
import AnalogSynth from "../audio/AnalogSynth";
import Note from "../audio/Note";
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

const Key = ({
  note,
  className,
  pressed,
  onMouseUp,
  onMouseDown,
  onMouseLeave
}) => {
  const styles = {
    backgroundColor: pressed && "gray"
  };
  return (
    <div
      key={note}
      className={cs("key", className)}
      style={styles}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
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
                    onMouseDown={() => this.handleMouseDown(note[0], oct)}
                    onMouseUp={() => this.handleMouseUp(note[0], oct)}
                    onMouseLeave={() => this.handleMouseUp(note[0], oct)}
                  />
                )}
                <Key
                  note={note[1]}
                  className="white"
                  pressed={this.isPressed(note[1], oct)}
                  onMouseDown={() => this.handleMouseDown(note[1], oct)}
                  onMouseUp={() => this.handleMouseUp(note[1], oct)}
                  onMouseLeave={() => this.handleMouseUp(note[1], oct)}
                />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  }

  private handleMouseDown(pitch: string, octave: number): void {
    const { synth } = this.props;
    console.log(pitch);
    const note = new Note(pitch, octave);
    synth.playTone(note);
  }

  private handleMouseUp(pitch: string, octave: number): void {
    const { synth } = this.props;
    const note = new Note(pitch, octave);
    synth.stopTone(note);
  }

  private isPressed(note, octave) {
    return this.props.synth.pressedKeys.indexOf(`${note}${octave}`) >= 0;
  }
}

export default MusicKeyboard;

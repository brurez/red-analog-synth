import cs from "classnames";
import { observer } from "mobx-react";
import * as React from "react";
import AnalogSynth from "../entities/AnalogSynth";
import Note from "../entities/Note";

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

interface IProps {
  synth: AnalogSynth;
  store: IStore;
}

@observer
class UIKeyboard extends React.Component<IProps> {
  public render() {
    const {
      store: { octave }
    } = this.props;

    return (
      <div className="music-keyboard">
        {[octave, octave + 1].map(oct => (
          <div key={oct} className="octave">
            {notes.map(note => (
              <React.Fragment key={`${note[1]}${oct}`}>
                {note[0] && (
                  <Key
                    note={note[0]}
                    className="black"
                    pressed={this.isPressed(note[0], oct)}
                    onMouseDown={() => this.handleMouseDown(note[0], oct)}
                    onMouseUp={() => this.handleMouseUp(note[0], oct)}
                    onMouseLeave={() => this.handleMouseUp(note[0], oct)}
                    key={`${note[0]}${oct}`}
                  />
                )}
                <Key
                  note={note[1]}
                  className="white"
                  pressed={this.isPressed(note[1], oct)}
                  onMouseDown={() => this.handleMouseDown(note[1], oct)}
                  onMouseUp={() => this.handleMouseUp(note[1], oct)}
                  onMouseLeave={() => this.handleMouseUp(note[1], oct)}
                  key={`${note[1]}${oct}`}
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
    const note = new Note(pitch, octave);
    synth.play(note);
  }

  private handleMouseUp(pitch: string, octave: number): void {
    const { synth } = this.props;
    const note = new Note(pitch, octave);
    synth.stop(note);
  }

  private isPressed(note, octave) {
    return this.props.synth.tonesPlayingNow.indexOf(`${note}${octave}`) >= 0;
  }
}

export default UIKeyboard;

class Filter {
  private ac: AudioContext;

  constructor(ac: AudioContext){
    this.ac = ac;
    const filter = this.ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
  }
}

export default Filter;
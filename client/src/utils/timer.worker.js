import Timer from "./Timer";
let timer;

class TimerWorker {
  constructor() {
    this.onmessage = (msg) => {
      switch (msg.data.event) {
        case "create":
          this.handleCreate(msg.data.min);
          break;
        case "pause":
          this.handlePause();
          break;
        case "reset":
          this.handleReset();
          break;
        case "resume":
          this.handleResume();
          break;
        case "start":
          this.handleStart();
          break;
        default:
          break;
      }
    };
  }

  // External event handlers

  handleCreate(min) {
    timer = new Timer(min);
    timer.addEventListener("complete", this.handleTimerComplete);
    timer.addEventListener("pause", this.handleTimerPause);
    timer.addEventListener("reset", this.handleTimerReset);
    timer.addEventListener("start", this.handleTimerStart);
    timer.addEventListener("tick", this.handleTimerTick);
  }

  handlePause() {
    if (!timer) return;
    timer.pause();
  }

  handleReset() {
    if (!timer) return;
    timer.reset();
  }

  handleResume() {
    if (!timer) return;
    timer.resume();
  }

  handleStart() {
    if (!timer) return;
    timer.start();
  }

  // Internal timer event handlers

  handleTimerComplete() {
    self.postMessage({ event: "complete" });
  }

  handleTimerPause() {
    self.postMessage({ event: "pause" });
  }

  handleTimerReset() {
    self.postMessage({ event: "reset" });
  }

  handleTimerStart(event) {
    self.postMessage({
      event: "start",
      elapsed: event.detail.time,
      totalSeconds: event.detail.totalSeconds,
    });
  }

  handleTimerTick(event) {
    self.postMessage({
      event: "tick",
      elapsed: event.detail.time,
      totalSeconds: event.detail.totalSeconds,
    });
  }
}

export default TimerWorker;

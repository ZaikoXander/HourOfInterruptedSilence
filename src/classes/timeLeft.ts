import { ONE_HOUR_IN_SECONDS } from "../constants"

class TimeLeft {
  private totalSeconds: number

  public constructor(totalSeconds: number) {
    this.totalSeconds = totalSeconds
  }

  public getHours(): number {
    return Math.floor(this.totalSeconds / ONE_HOUR_IN_SECONDS)
  }

  public getMinutes(): number {
    return Math.floor((this.totalSeconds % ONE_HOUR_IN_SECONDS) / 60)
  }

  public getSeconds(): number {
    return this.totalSeconds % 60
  }

  public getTotalSeconds(): number {
    return this.totalSeconds
  }
}

export default TimeLeft
class TimeLeft {
  private totalSeconds: number

  public constructor(totalSeconds: number) {
    this.totalSeconds = totalSeconds
  }

  public getHours(): number {
    return Math.floor(this.totalSeconds / 3600)
  }

  public getMinutes(): number {
    return Math.floor((this.totalSeconds % 3600) / 60)
  }

  public getSeconds(): number {
    return this.totalSeconds % 60
  }

  public getTotalSeconds(): number {
    return this.totalSeconds
  }
}

export default TimeLeft
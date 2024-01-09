export default class OneHourRandomAudioMomentsGenerator {
  private readonly oneHourInSeconds: number = 3600
  private readonly audioInterval: number = 5
  private readonly initialAudioMoment: number = 0
  private readonly finalAudioMoment: number
  private readonly audioDuration: number
  private readonly audioTotalDuration: number
  private readonly audioMoments: number[]
  private readonly lastPossibleAudioMoment: number
  private readonly randomAudiosPerHour: number = 13

  constructor(audioDuration: number) {
    this.audioDuration = audioDuration
    this.audioTotalDuration = this.audioDuration + this.audioInterval
    this.finalAudioMoment = this.oneHourInSeconds - this.audioTotalDuration
    this.audioMoments = [this.initialAudioMoment, this.finalAudioMoment]
    this.lastPossibleAudioMoment = this.finalAudioMoment - (this.audioTotalDuration * 2)
  }

  private generateRandomAudioMoment(): number {
    const min: number = this.audioTotalDuration
    const max: number = this.lastPossibleAudioMoment + 1
    const randomNumber: number = Math.floor(Math.random() * (max)) + min
  
    return randomNumber
  }

  public execute(): number[] {
    for (let i = 0; i < this.randomAudiosPerHour; i++) {
      let randomAudioMoment: number = this.generateRandomAudioMoment()
      while (this.audioMoments.some(audioMoment => Math.abs(audioMoment - randomAudioMoment) < this.audioTotalDuration)) {
        randomAudioMoment = this.generateRandomAudioMoment()
      }
    
      this.audioMoments.push(randomAudioMoment)
    }
    
    this.audioMoments.sort((a, b) => a - b)

    return this.audioMoments
  }
}

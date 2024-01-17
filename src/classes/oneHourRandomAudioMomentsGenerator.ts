import { ONE_HOUR_IN_SECONDS } from "../constants"

const { round, floor, random, abs } = Math

export default class OneHourRandomAudioMomentsGenerator {
  private readonly audioDuration: number
  private readonly audioTotalDuration: number
  private readonly finalAudioMoment: number
  private readonly audioMoments: number[]
  private readonly lastPossibleAudioMoment: number
  private readonly audioInterval: number = 5
  private readonly initialAudioMoment: number = 0
  private readonly randomAudiosPerHour: number = 13

  constructor(audioDuration: number) {
    this.audioDuration = round(audioDuration)
    this.audioTotalDuration = this.audioDuration + this.audioInterval
    this.finalAudioMoment = ONE_HOUR_IN_SECONDS - this.audioTotalDuration
    this.audioMoments = [this.initialAudioMoment, this.finalAudioMoment]
    this.lastPossibleAudioMoment = this.finalAudioMoment - (this.audioTotalDuration * 2)
  }

  private generateRandomAudioMoment(): number {
    const min: number = this.audioTotalDuration
    const max: number = this.lastPossibleAudioMoment + 1
    const randomNumber: number = floor(random() * (max)) + min
  
    return randomNumber
  }

  public execute(): number[] {
    for (let i = 0; i < this.randomAudiosPerHour; i++) {
      let randomAudioMoment: number = this.generateRandomAudioMoment()
      while (this.audioMoments.some(audioMoment => abs(audioMoment - randomAudioMoment) < this.audioTotalDuration)) {
        randomAudioMoment = this.generateRandomAudioMoment()
      }
    
      this.audioMoments.push(randomAudioMoment)
    }
    
    this.audioMoments.sort((a, b) => a - b)

    return this.audioMoments
  }
}

import Button from "./Button";

interface StartOrPauseTimerButtonProps {
  isRunning: boolean
  canResetTimer: boolean
  canStartPlaying: boolean
  handleStartOrPauseTimer: () => void
}

export default function StartOrPauseTimerButton({
  isRunning,
  canResetTimer,
  canStartPlaying,
  handleStartOrPauseTimer
}: StartOrPauseTimerButtonProps) {
  function startOrPauseTimerButtonText() {
    if (isRunning) return 'Pausar'
    if (canResetTimer) return 'Continuar'

    return 'Começar'
  }

  return (
    <Button
      className="bg-green-500"
      disabled={!canStartPlaying}
      onClick={handleStartOrPauseTimer}
    >
      {startOrPauseTimerButtonText()}
    </Button>
  )
}

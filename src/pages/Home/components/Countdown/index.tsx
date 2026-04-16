import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styled'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { differenceInSeconds } from 'date-fns'


export function Countdown() {
    const { activeCycle, activeCycleId,markCurrentCycleAsFinished, amountSecondsPassed, setSecondPassed } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.duration * 60 : 0

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>

        if (activeCycle) {

            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds (
                    new Date(), 
                    new Date(activeCycle.startDate)
                )

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

    //console.log(formState.errors)
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutos = String(minutesAmount).padStart(2, '0')
    const second = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutos}:${second}`
        } else {
            document.title = 'Ignite Timer'
        }
    }, [minutos, second, activeCycle])

    return (
        <CountdownContainer>
            <span>{minutos[0]}</span>
            <span>{minutos[1]}</span>
            <Separator>:</Separator>
            <span>{second[0]}</span>
            <span>{second[1]}</span>
        </CountdownContainer>
    )
}
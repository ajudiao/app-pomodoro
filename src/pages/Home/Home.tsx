import { PlayIcon } from '@phosphor-icons/react'
import { CountdownContainer, DurationInput, FormContainer, HomeContainer, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import *  as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { HandPalm } from 'phosphor-react'

const newCyleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  duration: zod.number().min(5, 'Mínimo 5 minutos').max(60, 'Maximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCyleFormValidationSchema>

interface Cycle {
    id: string,
    task: string,
    duration: number,
    startDate: Date,
    interruptedDate?: Date,
}

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCyleFormValidationSchema),
        defaultValues: {
            task: '',
            duration: 0
        }
    })

    const ativeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    useEffect(() => {
        let interval: number

        if (ativeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPassed(
                    differenceInSeconds(new Date(), ativeCycle.startDate),
                )
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [ativeCycle])

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String((new Date().getTime())),
            task: data.task,
            duration: data.duration,
            startDate: new Date()
        }
        setCycles((status) => [...status, newCycle])
        setActiveCycleId(newCycle.id)

        reset()
    }   

    function handleInterruptCycle() {
        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }))    
        setActiveCycleId(null)
    }

    console.log(cycles)
    /*
    a funcao register retorna os eventos onChange, onFocus etc
    expredoOperator
    */

    //console.log(formState.errors)

    
    const tatalSeconds = ativeCycle ? ativeCycle.duration * 60 : 0
    const currentSeconds = ativeCycle ? tatalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutos = String(minutesAmount).padStart(2, '0')
    const second = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (ativeCycle) {
            document.title = `${minutos}:${second}`
        } else {
            document.title = 'Ignite Timer'
        }
    }, [minutos, second, ativeCycle])

    const task = watch('task')
    const isSubmitDisable = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        type="text"
                        list="task-suggestions"
                        id="task"
                        disabled={ !!ativeCycle }
                        placeholder="Dê um nome para o seu projecto"
                        {...register('task')}
                    />
                    {/* Lista de sugestões para um input */}
                    <datalist id="task-suggestions">
                        <option value="Projecto 1" />
                        <option value="Projecto 2" />
                        <option value="Projecto 3" />
                        <option value="Projecto 4" />
                    </datalist>

                    <label htmlFor="duration">durante</label>
                    <DurationInput
                        type="number"
                        id="duration"
                        disabled={ !!ativeCycle }
                        placeholder="00"                        
                        {...register('duration', { valueAsNumber: true })}
                    />

                    <span>minutos.</span>

                    <CountdownContainer>
                        <span>{ minutos[0] }</span>
                        <span>{ minutos[1] }</span>
                        <Separator>:</Separator>
                        <span>{ second[0] }</span>
                        <span>{ second[1] }</span>
                    </CountdownContainer>

                    { ativeCycle ? (
                        <StopCountdownButton type="button" onClick={handleInterruptCycle}>
                            <HandPalm size={24} />
                            Interromper
                        </StopCountdownButton>
                    ) : (
                    <StartCountdownButton type="submit" disabled={ isSubmitDisable }>
                        <PlayIcon size={24} />
                        Começar
                    </StartCountdownButton>
                    ) }
                </FormContainer>
            </form>
        </HomeContainer >
    )
}
import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Countdown } from './components/Countdown'
import { StartCountdownButton, StopCountdownButton } from './components/Countdown/styled'
import { NewCycleForm } from './components/NewCycleForm'
import { HomeContainer } from './styles'
import { useContext } from 'react'

const newCyleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    duration: zod
        .number()
        .min(5, 'Mínimo 5 minutos')
        .max(60, 'Maximo 60 minutos'),
})


type NewCycleFormData = zod.infer<typeof newCyleFormValidationSchema>


export function Home() {
    const {activeCycle, createNewCycle, interruptCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCyleFormValidationSchema),
        defaultValues: {
            task: '',
            duration: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisable = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCycle} type='button'>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisable} type='submit'>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer >
    )
}
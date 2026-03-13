import { PlayIcon } from '@phosphor-icons/react'
import { CountdownContainer, DurationInput, FormContainer, HomeContainer, Separetor, TaskInput } from './style'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import *  as zod from 'zod'

const newCyleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    duration: zod.number().min(5).max(60),
})

export function Home() {

    const { register, handleSubmit, watch, formState } = useForm({
        resolver: zodResolver(newCyleFormValidationSchema),
    })

    function handleCreateNewCycle(data: object) {
        console.log(data)
    }   

    /*
    a funcao register retorna os eventos onChange, onFocus etc
    expredoOperator
    */

    console.log(formState.errors)

    const task = watch('task')
    const isSubmitDisable = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        type="text"
                        list="task-suggestion"
                        id="task"
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
                        placeholder="00"                        
                        {...register('duration')}
                    />

                    <span>minutos.</span>

                    <CountdownContainer>
                        <span>0</span>
                        <span>0</span>
                        <Separetor>:</Separetor>
                        <span>0</span>
                        <span>0</span>
                    </CountdownContainer>

                    <button type="submit" disabled={isSubmitDisable}>
                        <PlayIcon size={24} />
                        Começar
                    </button>
                </FormContainer>
            </form>
        </HomeContainer >
    )
}
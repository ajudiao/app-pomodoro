import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { DurationInput, FormContainer, TaskInput } from './styled'



export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text"
                list="task-suggestions"
                id="task"
                disabled={!!activeCycle}
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
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                placeholder="00"
                {...register('duration', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}
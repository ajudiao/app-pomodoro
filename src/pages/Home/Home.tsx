import { PlayIcon } from "@phosphor-icons/react";
import { CountdownContainer, DurationInput, FormContainer, HomeContainer, Separetor, TaskInput } from "./style";
import { useState } from "react";


export function Home() {

    const [task, setTask] = useState('')
    
    function resetForm() {
        setTask('')
    }

    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        type="text"
                        list="task-suggestion"
                        id="task"
                        placeholder="Dê um nome para o seu projecto"
                        onChange={(e) => setTask(e.target.value)}
                        value={task}
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
                        step={5}
                        min={5}
                        max={60}
                    />

                    <span>minutos.</span>

                    <CountdownContainer>
                        <span>0</span>
                        <span>0</span>
                        <Separetor>:</Separetor>
                        <span>0</span>
                        <span>0</span>
                    </CountdownContainer>

                    <button type="submit" disabled={!task}>
                        <PlayIcon size={24} />
                        Começar
                    </button>
                </FormContainer>
            </form>
        </HomeContainer >
    )
}
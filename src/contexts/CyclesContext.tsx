import {
    createContext,
    type ReactNode,
    useReducer,
    useState,
} from 'react'
import { ActionTypes, CycleReducer, type Cycle } from '../reducers/cycles/reducer'
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'

/* ===========================
   Tipos
=========================== */

interface CreateCycleData {
    task: string
    duration: number
}


interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    createNewCycle: (data: CreateCycleData) => void
    interruptCycle: () => void
    markCurrentCycleAsFinished: () => void
    setSecondPassed: (seconds: number) => void
}

interface CycleContextProviderProps {
    children: ReactNode 
}

/* ===========================
   Contexto
=========================== */

export const CyclesContext = createContext({} as CyclesContextType)

/* ===========================
   Provider
=========================== */

export function CyclesContextProvider({
    children,
}: CycleContextProviderProps) {

    /*
        O reducer é responsável por todas as alterações
        relacionadas com os ciclos.
    */
    const [cycles, dispatch] = useReducer(CycleReducer,
        [],
    )

    /*
        Guarda o ID do ciclo atualmente ativo.
    */
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    /*
        Guarda quantos segundos já passaram do ciclo atual.
    */
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    /*
        Procura o ciclo ativo na lista de ciclos.
    */
    const activeCycle = cycles.find(
        cycle => cycle.id === activeCycleId,
    )

    /*
        Cria um novo ciclo.
    */
    function createNewCycle(data: CreateCycleData) {
        const id = String(Date.now())

        const newCycle: Cycle = {
            id,
            task: data.task,
            duration: data.duration,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))

        setActiveCycleId(id)
        setAmountSecondsPassed(0)
    }

    /*
        Interrompe o ciclo atual.
    */
    function interruptCycle() {
        dispatch(interruptCurrentCycleAction())
        setActiveCycleId(null)
    }

    /*
        Finaliza o ciclo atual.
    */
    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
        setActiveCycleId(null)
    }

    /*
        Atualiza o contador de segundos.
    */
    function setSecondPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                createNewCycle,
                interruptCycle,
                markCurrentCycleAsFinished,

                setSecondPassed,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
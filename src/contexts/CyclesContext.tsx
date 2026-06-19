import {
    createContext,
    type ReactNode,
    useEffect,
    useReducer,
    useState,
} from 'react'
import { CycleReducer, type Cycle } from '../reducers/cycles/reducer'
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'

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
    interruptCurrentCycle: () => void
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
    const [cyclesState, dispatch] = useReducer(CycleReducer, [], () => {
        const storedStateAsJSON = localStorage.getItem(
            '@pomodoro:cycles-state-1.0.0',
        )

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }

        return []
    })

    /*
        Guarda o ID do ciclo atualmente ativo.
    */
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    /*
        Guarda quantos segundos já passaram do ciclo atual.
    */
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@pomodoro:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    /*
        Procura o ciclo ativo na lista de ciclos.
    */
    const activeCycle = cyclesState.find(
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
    function interruptCurrentCycle() {
        if (!activeCycleId) return

        dispatch(interruptCurrentCycleAction(activeCycleId))

        setActiveCycleId(null)
    }

    /*
        Finaliza o ciclo atual.
    */
    function markCurrentCycleAsFinished() {
        if (!activeCycleId) return
        
        dispatch(markCurrentCycleAsFinishedAction(activeCycleId))
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
                cycles: cyclesState,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                createNewCycle,
                interruptCurrentCycle,
                markCurrentCycleAsFinished,

                setSecondPassed,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
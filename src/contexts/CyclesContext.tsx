import { createContext, useState, type ReactNode, useReducer } from 'react'

interface CreateCyleData {
    task: string,
    duration: number,
}

interface Cycle {
    id: string,
    task: string,
    duration: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}

interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    markCurrentCycleAsFinished: () => void,
    amountSecondsPassed: number,
    setSecondPassed: (value: number) => void,
    createNewCycle: (data: CreateCyleData) => void,
    interruptCycle: () => void,
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
    // const [cycle, setCycle] = useState<Cycle[]>([])
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
        // console.log(state)
        // console.log(action)

        if (action.type === 'ADD_NEW_CYCLE')
            return [...state, action.payload.newCycle]
        return state
    }, [])

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId,
            }
        })

        // setCycles((state) => state.map(cycle => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, finishedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }))
    }

    function setSecondPassed(value: number) {
        setAmountSecondsPassed(value)
    }

    function createNewCycle(data: CreateCyleData) {
        const id = String((new Date().getTime()))
        const newCycle: Cycle = {
            id,
            task: data.task,
            duration: data.duration,
            startDate: new Date()
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle
            }
        })
        // setCycles((status) => [...status, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        // reset()
    }



    function interruptCycle() {
        // setCycles((state) => state.map(cycle => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, interruptedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }))
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId
            }
        })

        setActiveCycleId(null)
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondPassed,
                createNewCycle,
                interruptCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
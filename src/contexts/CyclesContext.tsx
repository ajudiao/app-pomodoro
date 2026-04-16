import { createContext, useState, type ReactNode } from 'react'

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
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        }))
    }

    function setSecondPassed(value: number) {
        setAmountSecondsPassed(value)
    }

    function createNewCycle(data: CreateCyleData) {
        const newCycle: Cycle = {
            id: String((new Date().getTime())),
            task: data.task,
            duration: data.duration,
            startDate: new Date()
        }
        setCycles((status) => [...status, newCycle])
        setActiveCycleId(newCycle.id)

        // reset()
    }

    function interruptCycle() {
        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }))
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
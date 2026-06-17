import { ActionTypes } from './actions'

export interface Cycle {
    id: string
    task: string
    duration: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

export function CycleReducer(state: Cycle[], action: any): Cycle[] {
    switch (action.type) {

        case ActionTypes.ADD_NEW_CYCLE:
            return [...state, action.payload.newCycle]

        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            return state.map(cycle => {
                if (cycle.id === action.payload.activeCycleId) {
                    return {
                        ...cycle,
                        interruptedDate: new Date(),
                    }
                }

                return cycle
            })

        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
            return state.map(cycle => {
                if (cycle.id === action.payload.activeCycleId) {
                    return {
                        ...cycle,
                        finishedDate: new Date(),
                    }
                }

                return cycle
            })
        default:
            return state
    }
}

export { ActionTypes }

import type { Cycle } from "./reducer";


/* ===========================
   Tipos das Actions
=========================== */
export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

// export const ActionTypes = {
//   ADD_NEW_CYCLE: 'ADD_NEW_CYCLE',
//   INTERRUPT_CURRENT_CYCLE: 'INTERRUPT_CURRENT_CYCLE',
//   MARK_CURRENT_CYCLE_AS_FINISHED: 'MARK_CURRENT_CYCLE_AS_FINISHED',
// } as const

// export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes]

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            newCycle,
        },
    }
}

export function interruptCurrentCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}

export function markCurrentCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    }
}
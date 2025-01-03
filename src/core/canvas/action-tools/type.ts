export enum ActionType {
    DELETE_NODE = 'DELETE_NODE',
    SELECT_NODE_PARENT = 'SELECT_NODE_PARENT',
    LOCK_NODE = 'LOCK_NODE'
}

export type ActionOption = {
    type: ActionType
    payload: any
}
export type actionBarItem = {
    icon: string
    label: string
    type: ActionType
}

export type actionBarItemList = actionBarItem[]

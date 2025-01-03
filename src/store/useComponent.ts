// 组件
import {create} from 'zustand'
import {ComponentNode} from '@core/meta'
import {findNodeAndParent} from '@/utils'

type componentsInfo = {
    /**
     * 画布组件
     */
    canvasComponent: ComponentNode | null
    /**
     * 组件列表
     */
    components: ComponentNode[]
    /**
     * 当前组件信息
     */
    curComponentInfo: {
        /**
         * id
         */
        id: string
        /**
         * 路径
         */
        path: string
    }
}

type Action = {
    /**
     * 设置当前组件信息
     * @param info 组件信息
     * @returns
     *
     */
    setCurComponentInfo: (info: componentsInfo['curComponentInfo']) => void
    /**
     * 初始化画布组件
     * @param component 组件
     * @returns
     */
    initCanvasComponent: (component: ComponentNode) => void
    /**
     * 添加组件
     * @param component 组件属性
     * @param parentId 父组件id
     * @returns
     */
    addComponent: (component: ComponentNode, parentId?: string) => void

    /**
     * 插入组件
     * @param component 组件
     * @param targetId 目标id
     * @param curComponentId 当前组件id
     * @returns
     */
    insertComponent: (
        curComponentId: string,
        targetId: string,
        component?: ComponentNode
    ) => void
    /**
     * 移动组件
     * @param targetId 目标id
     * @param curComponentId 当前组件id
     * @returns
     */
    moveComponent: (targetId: string, curComponentId: string) => void

    /**
     * 删除组件
     * @param id 组件id
     * @returns
     */
    deleteComponent: (id: string) => void
    /**
     * 改变组件锁定状态锁定组件
     * @param id 组件id
     * @param value 锁定状态
     * @returns
     */
    changeLockComponent: (id: string, value?: boolean) => void
}

const useMaterial = create<componentsInfo & Action>((set, get) => ({
    curComponentInfo: {
        id: '',
        path: ''
    },
    canvasComponent: null,
    components: [],
    setCurComponentInfo: (info) => {
        set({
            curComponentInfo: info
        })
    },
    initCanvasComponent: (component) => {
        set({
            canvasComponent: component,
            components: []
        })
    },
    changeLockComponent: (id, value) => {
        set((state) => {
            const {component} = findNodeAndParent(id, state.components)
            const isBooleanValue = typeof value === 'boolean'
            
            if (component) {
                component.isLock = isBooleanValue ? isBooleanValue : !component.isLock
            }
            return {components: [...state.components]}
        })
    },
    deleteComponent: (id) => {
        set((state) => {
            const {parentComponent} = findNodeAndParent(id, state.components)

            // 从根组件列表中删除
            const deleteFromRoot = () => {
                const index = state.components.findIndex(
                    (item) => item.id === id
                )
                if (index !== -1) {
                    state.components.splice(index, 1)
                }
            }

            // 从父组件的子组件中删除
            const deleteFromParent = (parent: ComponentNode) => {
                const index = parent.children?.findIndex(
                    (item) => item.id === id
                )
                if (index && index !== -1) {
                    parent.children?.splice(index, 1)
                }
            }

            if (!parentComponent) {
                deleteFromRoot()
            } else {
                // 如果父组件是画布组件，需要同时从根组件列表中删除
                if (parentComponent.id === state.canvasComponent?.id) {
                    deleteFromRoot()
                }
                deleteFromParent(parentComponent)
            }

            return {components: [...state.components]}
        })
    },
    addComponent: (component, parentId) => {
        set((state) => {
            if (parentId) {
                component.parentId = parentId

                if (parentId === state.canvasComponent?.id) {
                    return {
                        components: [...state.components, component]
                    }
                } else {
                    const {component: targetCom} = findNodeAndParent(
                        parentId,
                        state.components
                    )

                    if (!targetCom.children) {
                        targetCom.children = []
                    }
                    targetCom.children.push(component)
                }
            } else {
                component.parentId = parentId
                return {components: [...state.components]}
            }
            return {
                components: [...state.components, component]
            }
        })
    },
    moveComponent: (targetId, curComponentId) => {
        console.log('move', targetId, curComponentId)
    },
    insertComponent: (curComponentId, targetId, component) => {
        const {addComponent, moveComponent} = get()
        if (component) {
            return addComponent(component, targetId)
        }
        return moveComponent(targetId, curComponentId)
    }
}))

export default useMaterial

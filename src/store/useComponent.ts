// 组件
import {create} from 'zustand'
import {ComponentNode, ComponentNodePropType} from '@core/meta'
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
    /**
     * 根据id查找组件
     * @param id 组件id
     * @returns
     */
    findCurrentComponentById: (id: string) => ComponentNode | null
    /**
     * 更新组件
     * @param component 组件
     * @returns
     *
     */
    updateComponent: (
        id: string,
        data: {
            [propName: string]: ComponentNodePropType
        }
    ) => void
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
    updateComponent: (id,data) => {
        set((state) => {
            const {component} = findNodeAndParent(id, state.components)
            if (component) {
                component.props = {
                    ...component.props,
                   ...data
                }
            }
            return {components: [...state.components]}
        })
    },
    findCurrentComponentById: (id) => {
        const {component} = findNodeAndParent(id, get().components)
        return component
    },
    changeLockComponent: (id, value) => {
        set((state) => {
            const {component} = findNodeAndParent(id, state.components)
            const isBooleanValue = typeof value === 'boolean'

            if (component) {
                component.isLock = isBooleanValue
                    ? isBooleanValue
                    : !component.isLock
            }
            return {components: [...state.components]}
        })
    },
    deleteComponent: (id) => {
        set((state) => {
            const {parentComponent} = findNodeAndParent(id, state.components)

            console.log(parentComponent, 12)

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
                console.log(index)
                if (index !== undefined && index !== -1) {
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
            if (!parentId) {
                return {
                    components: [...state.components]
                }
            }

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
            return {
                components: [...state.components]
            }
        })
    },
    moveComponent: (targetId, curComponentId) => {
        // @TODO 只支持从尾部插入，后续优化中间插入
        console.log('move', targetId, curComponentId)
        set((state) => {
            const {
                component: curComponent,
                parentComponent: curComponentParent
            } = findNodeAndParent(curComponentId, state.components)
            const curIndex = curComponentParent?.children?.findIndex(
                (item) => item.id === curComponentId
            )

            curComponentParent?.children?.splice(curIndex!, 1)
            // 移动到根组件下
            if (targetId === state.canvasComponent?.id) {
                state.components.push(curComponent!)
            } else {
                const {
                    component: targetComponent
                    // parentComponent: targetComponentParent
                } = findNodeAndParent(targetId, state.components)

                // 移动到目标组件下
                if (!targetComponent?.children) {
                    targetComponent.children = []
                }
                targetComponent.children.push(curComponent!)
            }

            return {
                components: [...state.components]
            }
        })
    },
    insertComponent: (curComponentId, targetId, component) => {
        const {addComponent, moveComponent} = get()
        if (component) {
            return addComponent(component, targetId)
        }
        if (curComponentId === get().canvasComponent?.id) return

        return moveComponent(targetId, curComponentId)
    }
}))

export default useMaterial

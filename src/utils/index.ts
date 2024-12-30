import {ComponentNode} from '@core/meta'
import {formatProps} from '@core/utils'
import {useMaterial, useComponent} from '@/store'

/**
 * 初始化画布
 */
export const initCanvas = () => {
    const {materialMapConfig} = useMaterial.getState()
    const {initCanvasComponent} = useComponent.getState()
    const Page = materialMapConfig.get('Page')!
    const node: ComponentNode = {
        type: Page.componentType,
        description: Page.description,
        props: formatProps(Page.defaultProps),
        name: 'Page',
        isLock: true,
        children: [],
        id: String(new Date().getTime()),
        parentId: ''
    }
    initCanvasComponent(node)
}

/**
 * 递归遍历查找节点
 */
const traverseNodes = (
    id: string,
    nodes: ComponentNode[],
    parent: ComponentNode
): {component: ComponentNode; parentComponent: ComponentNode} | null => {
    for (const node of nodes) {
        if (node.id === id) {
            return {component: node, parentComponent: parent}
        }
        if (node.children && node.children?.length > 0) {
            const result = traverseNodes(id, node.children, node)
            if (result) return result
        }
    }
    return null
}

/**
 * 查找指定ID的节点及其父节点
 * @param id 要查找的节点ID
 * @param components 组件树
 */
export const findNodeAndParent = (
    id: string,
    components: ComponentNode[]
): {
    component: ComponentNode
    parentComponent: ComponentNode
} => {
    const {canvasComponent} = useComponent.getState()

    const result = traverseNodes(id, components, canvasComponent!)

    // 找不到指定节点时，返回根组件
    return (
        result || {
            component: canvasComponent!,
            parentComponent: canvasComponent!
        }
    )
}

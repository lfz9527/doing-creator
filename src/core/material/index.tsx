// 整个物料库的入口文件
import {MaterialModule} from './types'
import {MaterialConfig} from '@core/meta'

class Material {
    /**
     * 物料映射表
     */
    materialMap = new Map<string, MaterialConfig>()

    /**
     * 初始化物料库
     */
    async init() {
        this.clearMaterial()
        await this.injectMaterial()
    }

    /**
     * 注入物料
     */
    async injectMaterial() {
        this.clearMaterial()
        // 获取所有的物料库
        const modules = import.meta.glob('./**/*/register.ts', {
            eager: true
        })
        // 遍历所有的物料库
        const tasks = Object.values(
            modules as Record<string, MaterialModule>
        ).map((module) => {
            if (module?.default) {
                // 执行组件配置里的方法，把注册组件方法传进去
                return module.default({
                    registerMater: (name, componentConfig) => {
                        this.materialMap.set(name, componentConfig)
                    }
                })
            }
        })
        // 等待所有组件配置加载完成
        await Promise.all(tasks)

        return this
    }

    /**
     * 清空物料
     */
    clearMaterial() {
        this.materialMap.clear()
    }
}

export default Material

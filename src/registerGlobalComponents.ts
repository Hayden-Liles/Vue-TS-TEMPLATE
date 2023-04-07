import { App } from 'vue'
import { ComponentOptions } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Component extends ComponentOptions { }

export function registerGlobalComponents(root: App) {
    const components: Record<string, Component> = import.meta.globEager('./components/*.vue')
    Object.entries(components).forEach(([fileName, component]) => {
        const componentName = component.name || fileName
            .substring(fileName.lastIndexOf('/') + 1)
            .replace(/\.\w+$/, '')
        // Register component on this Vue instance
        root.component(componentName, component.default)
    })
}
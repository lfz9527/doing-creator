import {ComponentNodePropType} from '@core/meta'

export type contentProps = {
  item: any
  id: string
  componentProps: {
      [key: string]: ComponentNodePropType
  }
  addResetCallback: (key: string, callback: () => void) => void
}
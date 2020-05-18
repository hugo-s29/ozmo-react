import ozmo, { IOzmo } from 'ozmo-compile'
import React, { SFC } from 'react'

export { IOzmo, ozmo }

export type ComponentList = {
  [key in IOzmo.BlockType | IOzmo.ObjectType]?: React.SFC<{
    args: string[]
  }>
}
export interface Config {
  components: ComponentList
  container?: React.SFC
}

function genMarkup(
  { type, content, args = [] }: IOzmo.OzmObject,
  components: ComponentList
): SFC {
  const Elem = components[type]

  if (!Elem)
    throw new Error(`Element of type ${type} not defined in the config`)

  if (Array.isArray(content))
    return () => (
      <Elem args={args}>{content.map(e => genMarkup(e, components))}</Elem>
    )

  return () => <Elem args={args}>{content}</Elem>
}

const defaultContainer: SFC = p => <div {...p}>{p.children}</div>

const Ozmo: SFC<{ content: string; config: Config }> = ({
  config: { container: Container = defaultContainer, components },
  content,
}) => {
  const elements = ozmo(content)
  return <Container>{elements.map(e => genMarkup(e, components))}</Container>
}

export default Ozmo

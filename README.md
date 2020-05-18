# Ozmo compiler

Ozmo markup language compiler

[Main repository](https://github.com/hugo-s29/ozmo-compile)

```javascript
import Ozmo from 'ozmo-react'
import React from 'react'

const config = {
  components: {
    code: props => <Code language={props.args[0]}>{props.children}</Code>,
    h1: props => <h1>{props.args.join(' ')}</h1>,
    image: props => <img src={props.args[0]} />,
  },
  container: p => <div {...p}>{p.children}</div>,
}

const Component = ({ content }) => (
  <Ozmo content={content} config={config}></Ozmo>
)

export default Component
```

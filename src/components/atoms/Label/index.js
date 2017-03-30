import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Label = styled.label`
  color: ${palette('grayscale', 1)};
  font-size: 1rem;
  line-height: 2em;
`

Label.propTypes = {
  reverse: PropTypes.bool,
}

export default Label

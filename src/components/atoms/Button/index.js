import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router'
import { font, palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const fontSize = ({ height }) => `${height / 40}rem`

const backgroundColor = ({ transparent, disabled }) =>
  transparent ? 'transparent' : palette(disabled ? 2 : 1)

const foregroundColor = ({ transparent, disabled }) =>
  transparent ? palette(disabled ? 2 : 1) : palette('grayscale', 0, true)

const hoverBackgroundColor = ({ disabled, transparent }) => !disabled && !transparent && palette(0)
const hoverForegroundColor = ({ disabled, transparent }) => !disabled && transparent && palette(0)

const styles = css`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-size: ${fontSize};
  text-transform: uppercase;
  letter-spacing: 0.065em;
  border: 0.0625em solid ${ifProp('transparent', 'currentcolor', 'transparent')};
  height: 2.5em;
  justify-content: center;
  text-decoration: none;
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  appearance: none;
  padding: 0 1em;
  border-radius: 0.25em;
  box-sizing: border-box;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  box-shadow: ${ifProp('transparent', 'none', `
    0 2px 5px 0 rgba(0, 0, 0, 0.2),
    0 2px 10px 0 rgba(0, 0, 0, 0.2)
  `)};
  background-color: ${backgroundColor};
  color: ${foregroundColor};
  transition: background-color 250ms ease-out,
              color 250ms ease-out,
              border-color 250ms ease-out,
              box-shadow 250ms ease-out,
              transform 150ms ease-out;

  &:hover, &:focus, &:active {
    background-color: ${hoverBackgroundColor};
    color: ${hoverForegroundColor};
  }

  &:hover {
    box-shadow: ${ifProp('transparent', 'none', `
      0 3px 7px 0 rgba(0, 0, 0, 0.2),
      0 4px 12px 0 rgba(0, 0, 0, 0.2)
    `)};
  }

  &:not(:focus):hover {
    transform: translateY(-1px);
  }

  &:focus,
  &:focus:hover {
    outline: none;
    box-shadow: ${ifProp('transparent', 'none', `
      0 2px 3px 0 rgba(0, 0, 0, 0.3),
      0 2px 8px 0 rgba(0, 0, 0, 0.3);
    `)};
  }
`

const StyledLink = styled(({ disabled, transparent, reverse, palette, height, theme, ...props }) =>
  <Link {...props} />
)`${styles}`
const Anchor = styled.a`${styles}`
const StyledButton = styled.button`${styles}`

const Button = ({ type, ...props }) => {
  if (props.to) {
    return <StyledLink {...props} />
  } else if (props.href) {
    return <Anchor {...props} />
  }
  return <StyledButton {...props} type={type} />
}

Button.propTypes = {
  disabled: PropTypes.bool,
  palette: PropTypes.string,
  transparent: PropTypes.bool,
  reverse: PropTypes.bool,
  height: PropTypes.number,
  type: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
}

Button.defaultProps = {
  palette: 'primary',
  type: 'button',
  height: 40,
}

export default Button

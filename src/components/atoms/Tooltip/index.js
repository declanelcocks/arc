import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'

import { fonts } from 'components/globals'

const opposites = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
}

export const opposite = ({ position }) => opposites[position]

export const perpendicular = ({ position }) =>
  position === 'left' || position === 'right' ? 'top' : 'left'

export const perpendicularOpposite = (props) => opposites[perpendicular(props)]

export const perpendicularAxis = ({ position }) =>
  position === 'left' || position === 'right' ? 'Y' : 'X'

const backgroundColor = ({ light }) =>
  light ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'

const color = ({ light }) =>
  light ? 'black' : 'white'

const styles = css`
  position: relative;

  &:before,
  &:after {
    position: absolute;
    pointer-events: none;
    display: block;
    opacity: 0;
    transition: opacity 100ms ease-in-out, ${opposite} 100ms ease-in-out;
    will-change: ${opposite};
  }

  &:hover:before,
  &:focus:before {
    opacity: 1;
    ${opposite}: calc(100% + 1rem);
  }

  &:hover:after,
  &:focus:after {
    opacity: 1;
    ${opposite}: 100%;
  }

  &:before {
    content: attr(data-title);
    font-family: ${fonts.primary};
    white-space: nowrap;
    text-transform: none;
    font-size: 0.8125rem;
    line-height: 1.5;
    text-align: center;
    color: ${color};
    background-color: ${backgroundColor};
    border-radius: 0.15384em;
    padding: 0.75em 1em;
    ${opposite}: calc(100% + 2rem);
    ${({ align }) => {
      switch (align) {
        case 'start': return css`
          ${perpendicular}: 0;
        `
        case 'center': return css`
          ${perpendicular}: 50%;
          transform: translate${perpendicularAxis}(-50%);
        `
        case 'end': return css`
          ${perpendicularOpposite}: 0;
        `
      }
    }}
  }

  &:after {
    ${opposite}: calc(100% + 1rem);
    ${perpendicular}: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    border-${({ position }) => position}-color: ${backgroundColor};
    border-width: 0.5rem;
    margin-${perpendicular}: -0.5rem;
  }
`

const Tooltip = styled(({ position, align, light, children, ...props }) =>
  React.cloneElement(children, { tabIndex: 0, ...props })
)`${styles}`

Tooltip.propTypes = {
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  align: PropTypes.oneOf(['start', 'center', 'end']),
  light: PropTypes.bool,
  'data-title': PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

Tooltip.defaultProps = {
  position: 'top',
  align: 'center'
}

export default Tooltip
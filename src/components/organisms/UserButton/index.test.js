import React from 'react'
import { shallow } from 'enzyme'
import UserButton from '.'

const onLogin = jest.fn()
const onLogout = jest.fn()

const wrap = (props = {}) => shallow(<UserButton {...{ onLogin, onLogout }} {...props} />)

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})

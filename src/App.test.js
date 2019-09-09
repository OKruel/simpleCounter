import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App';
import { wrap } from 'module';

Enzyme.configure({adapter: new EnzymeAdapter()})


//!Returns a shallowWrapper for the component
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props}/>)
  if(state) wrapper.setState(state)
  return wrapper
}
//!Returns a find function that evatulates if exists a attribute in a tag
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders without crashing', () => {
  const wrapper = setup()
  const appComponent =  findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)

});

test('renders increment button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('renders the counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('the counter starts at 0', () => {
  const wrapper = setup()
  const CounterInitialState = wrapper.state('counter')
  expect(CounterInitialState).toBe(0)
})

test('clicking the button increments the counter in the display', () => {
  const counter = 7
  const wrapper = setup(null, {counter})

  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')
  wrapper.update()

  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter + 1)
})

test('clicking the decrement button will decremente the counter display', () => {
  const counter = 9
  const wrapper = setup(null, {counter})

  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')

  const displayCounter = findByTestAttr(wrapper, 'counter-display')
  expect(displayCounter.text()).toContain(counter - 1)
})

test('if display counter is 0 and the decrement button is click an alert should appear', () => {
  const counter = 0
  const wrapper = setup(null, {counter})

  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')

  const p = findByTestAttr(wrapper, 'error-message')
  expect(p.text()).toContain('Counter can not be negative')
})
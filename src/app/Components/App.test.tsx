import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import App from './App';

let wrapper: ReactWrapper<React.FC>;

describe('App renders', () => {
  it('renders', () => {
    wrapper = mount(<App compiler="typescript" bundler="webpack" framework="react" />);
    expect(wrapper.find('h2')).toExist();
  });
});

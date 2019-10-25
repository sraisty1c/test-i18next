import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import App from './App';

let wrapper: ReactWrapper<React.FC>;

describe('App renders', () => {
  it('renders', () => {
    wrapper = mount(<App testMessage="Basic testmessage" />);
    expect(wrapper.find('h2')).toExist();
  });
});

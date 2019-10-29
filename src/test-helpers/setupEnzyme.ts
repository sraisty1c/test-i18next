import 'jest-enzyme'
import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
// import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

// window.URL.createObjectURL = () => '';

import { mount } from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button Spec', () => {
  it('Button should render', () => {
    const wrapper = mount(Button, {
      propsData: {
        action: 'Next',
      },
    });

    expect(wrapper.text()).toBe('Next');
  });

  it('Button should emit a event is clicked', () => {
    const wrapper = mount(Button, {
      propsData: {
        action: 'Next',
      },
    });

    wrapper.find('.btn').trigger('click');

    expect(wrapper.emitted().onClick).toBeTruthy();
  });
});

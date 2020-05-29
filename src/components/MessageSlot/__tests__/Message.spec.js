import { mount } from '@vue/test-utils';
import Message from '../Message.vue';

describe('Message Spec', () => {
  it('Should render text when varierity is text', () => {
    const wrapper = mount(Message, {
      propsData: {
        variety: 'text',
        text: 'Foo',
      },
    });

    expect(wrapper.text()).toBe('Foo');
  });

  it('Should render a image when varierity is image', () => {
    const wrapper = mount(Message, {
      propsData: {
        variety: 'image',
        url: 'Foo',
        alt: 'foo',
      },
    });

    const input = wrapper.find('.gif');

    expect(input.attributes('src')).toBe('Foo');
    expect(input.attributes('alt')).toBe('foo');
  });
});

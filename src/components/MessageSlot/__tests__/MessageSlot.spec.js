import { mount } from '@vue/test-utils';
import MessageSlot from '../MessageSlot.vue';

jest.mock('../../../utils', () => ({
  avatarUrlByUsername: () => 'www.google.com',
  getFormattedHour: () => '12:00pm',
}));

describe('MessageSlot Spec', () => {
  it('Should render', () => {
    const wrapper = mount(MessageSlot, {
      propsData: {
        username: 'Foo Bar',
        messages: [{
          type: 'text',
          text: 'Foo',
        }],
        date: new Date(),
      },
    });

    const title = wrapper.find('.title');
    const messageLine = wrapper.find('.message-line');

    expect(title.text()).toBe('Foo Bar 12:00pm');
    expect(messageLine.exists()).toBeTruthy();
  });
});

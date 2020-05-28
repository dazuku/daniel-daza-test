import { mount } from '@vue/test-utils';
import MessageInput from '../MessageInput.vue';

jest.mock('../../../utils', () => ({
  getGifByTag: () => 'www.google.com',
}));

const localThisMock = {
  commands: [
    {
      cmd: 'foo',
      action: (props) => {
        expect(props).toBe('value');
        return 'foo-action';
      },
    },
    {
      cmd: 'bar',
      action: (props) => {
        expect(props).toBe('value');
        return 'bar-action';
      },
    },
  ],
  getCommandResult: () => 'www.google.com',
};

describe('MessageInput Spec', () => {
  it('MessageInput should render', () => {
    const wrapper = mount(MessageInput, {
      propsData: {
        placeholder: 'Message',
      },
    });

    const input = wrapper.find('[type="text"]');

    expect(input.attributes('placeholder')).toBe('Message');
  });

  it('getCommandResult should return the corresponding result of the action', () => {
    const result = MessageInput.methods.getCommandResult.call(localThisMock, '/foo value');

    expect(result).toBe('foo-action');
  });

  it('getCommandResult should throw error when command not found', () => {
    try {
      MessageInput.methods.getCommandResult.call(localThisMock, '/baz value');

      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBeTruthy();
    }
  });

  it('sendMessage method should emit onSend when is a plain text', async () => {
    const localThis = {
      message: 'Foo!',
      $emit: jest.fn().mockImplementation((_, params) => {
        expect(params.type).toBe('text-message');
        expect(params.value).toBe('Foo!');
      }),
      ...localThisMock,
    };

    await MessageInput.methods.sendMessage.call(localThis);

    expect(localThis.message).toBe('');
    expect(localThis.$emit).toBeCalled();
  });

  it('sendMessage method should emit onSend when is a command', async () => {
    const localThis = {
      message: '/foo',
      $emit: jest.fn().mockImplementation((_, params) => {
        expect(params.type).toBe('image-message');
        expect(params.value).toBe('www.google.com');
      }),
      ...localThisMock,
    };

    await MessageInput.methods.sendMessage.call(localThis);

    expect(localThis.message).toBe('');
    expect(localThis.$emit).toBeCalled();
  });

  it('sendMessage method should emit setErrorMessage when an error happen', async () => {
    const localThis = {
      message: '/baz',
      $emit: jest.fn().mockImplementation((event, message) => {
        expect(event).toBe('setErrorMessage');
        expect(message).toBe('error');
      }),
      ...localThisMock,
      getCommandResult: () => {
        throw new Error('error');
      },
    };

    await MessageInput.methods.sendMessage.call(localThis);

    expect(localThis.message).toBe('/baz');
    expect(localThis.$emit).toBeCalled();
  });

  it('watch message shouuld emit typing when user is typing', () => {
    const localThis = {
      $socket: {
        emit: jest.fn(),
      },
      $emit: jest.fn((method) => {
        expect(method).toBe('setErrorMessage');
      }),
      checkIsTyping: jest.fn(),
    };

    MessageInput.watch.message.call(localThis);

    expect(localThis.$socket.emit).toBeCalled();
    expect(localThis.$emit).toBeCalled();
    expect(localThis.checkIsTyping).toBeCalled();
  });
});

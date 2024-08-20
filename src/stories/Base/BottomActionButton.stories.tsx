import BottomActionButton from '@/ui/Base/BottomActionButton';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BottomActionButton> = {
  title: 'Base/BottomActionButton',
  component: BottomActionButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomActionButton>;

export const Default: Story = {
  args: {},
  render: () => (
    <BottomActionButton onClick={() => alert('click!')}>
      다음
    </BottomActionButton>
  ),
};

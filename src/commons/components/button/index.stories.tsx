import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능',
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼 전체 너비 사용 여부',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    iconOnly: {
      control: 'boolean',
      description: '아이콘만 표시 (텍스트 없음)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Basic Stories
// ========================================

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

// ========================================
// Size Variants
// ========================================

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

// ========================================
// State Variants
// ========================================

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// ========================================
// Icon Variants
// ========================================

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export const WithIcon: Story = {
  args: {
    icon: <PlusIcon />,
    children: 'Add Item',
  },
};

export const IconOnly: Story = {
  args: {
    icon: <PlusIcon />,
    iconOnly: true,
  },
};

// ========================================
// Theme Variants
// ========================================

export const LightTheme: Story = {
  args: {
    theme: 'light',
    children: 'Light Theme',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    children: 'Dark Theme',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// ========================================
// Combination Stories
// ========================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button icon={<PlusIcon />}>With Icon</Button>
        <Button icon={<PlusIcon />} iconOnly />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizesWithVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button variant="primary" size={size}>
            Primary {size}
          </Button>
          <Button variant="secondary" size={size}>
            Secondary {size}
          </Button>
          <Button variant="tertiary" size={size}>
            Tertiary {size}
          </Button>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ========================================
// Interactive Stories
// ========================================

export const Interactive: Story = {
  args: {
    children: 'Click me!',
    onClick: () => alert('Button clicked!'),
  },
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Playground Button',
    fullWidth: false,
    loading: false,
    disabled: false,
    iconOnly: false,
  },
};

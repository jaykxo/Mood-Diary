import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Toggle> = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 토글 스위치 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '토글의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '토글의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능',
    },
    checked: {
      control: 'boolean',
      description: '토글 상태 (제어 컴포넌트)',
    },
    defaultChecked: {
      control: 'boolean',
      description: '기본 토글 상태 (비제어 컴포넌트)',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '라벨 위치',
    },
    description: {
      control: 'text',
      description: '토글 설명 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
  },
  args: {
    label: 'Toggle Switch',
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
    label: 'Primary Toggle',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Toggle',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    label: 'Tertiary Toggle',
  },
};

// ========================================
// Size Variants
// ========================================

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Toggle',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Medium Toggle',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Toggle',
  },
};

// ========================================
// State Variants
// ========================================

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked Toggle',
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked Toggle',
  },
};

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
    label: 'Default Checked Toggle',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Notifications',
    description: 'Receive push notifications on your device',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Toggle',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'Disabled Checked Toggle',
  },
};

// ========================================
// Label Position Variants
// ========================================

export const LabelLeft: Story = {
  args: {
    label: 'Left Label',
    labelPosition: 'left',
  },
};

export const LabelRight: Story = {
  args: {
    label: 'Right Label',
    labelPosition: 'right',
  },
};

export const LabelLeftWithDescription: Story = {
  args: {
    label: 'Dark Mode',
    description: 'Switch to dark theme',
    labelPosition: 'left',
  },
};

export const LabelRightWithDescription: Story = {
  args: {
    label: 'Auto Save',
    description: 'Automatically save your work',
    labelPosition: 'right',
  },
};

// ========================================
// Theme Variants
// ========================================

export const LightTheme: Story = {
  args: {
    theme: 'light',
    label: 'Light Theme Toggle',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    label: 'Dark Theme Toggle',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Toggle variant="primary" label="Primary" />
          <Toggle variant="secondary" label="Secondary" />
          <Toggle variant="tertiary" label="Tertiary" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Toggle size="small" label="Small" />
          <Toggle size="medium" label="Medium" />
          <Toggle size="large" label="Large" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Toggle label="Normal" />
          <Toggle checked label="Checked" />
          <Toggle disabled label="Disabled" />
          <Toggle disabled checked label="Disabled Checked" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizesWithVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize' }}>
            {size} Size
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Toggle
              variant="primary"
              size={size}
              label={`Primary ${size}`}
            />
            <Toggle
              variant="secondary"
              size={size}
              label={`Secondary ${size}`}
            />
            <Toggle
              variant="tertiary"
              size={size}
              label={`Tertiary ${size}`}
            />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Label Left</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Toggle labelPosition="left" label="Enable notifications" />
          <Toggle labelPosition="left" label="Auto-save documents" description="Save changes automatically" />
          <Toggle labelPosition="left" label="Dark mode" description="Switch to dark theme" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Label Right</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Toggle labelPosition="right" label="Enable notifications" />
          <Toggle labelPosition="right" label="Auto-save documents" description="Save changes automatically" />
          <Toggle labelPosition="right" label="Dark mode" description="Switch to dark theme" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const SettingsExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>설정</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Toggle
          label="알림 허용"
          description="새로운 메시지와 업데이트에 대한 알림을 받습니다"
          defaultChecked
        />
        <Toggle
          label="다크 모드"
          description="어두운 테마로 전환합니다"
        />
        <Toggle
          label="자동 저장"
          description="변경사항을 자동으로 저장합니다"
          defaultChecked
        />
        <Toggle
          label="위치 서비스"
          description="위치 기반 서비스를 사용합니다"
        />
        <Toggle
          label="데이터 동기화"
          description="여러 기기 간 데이터를 동기화합니다"
          disabled
          checked
        />
      </div>
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
    label: 'Interactive Toggle',
    description: 'Click to toggle state',
    onChange: (checked, event) => {
      console.log('Toggle state changed:', checked);
      console.log('Event:', event);
    },
  },
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Playground Toggle',
    description: 'Toggle description text',
    labelPosition: 'right',
    checked: false,
    disabled: false,
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './index';

const meta = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
페이지네이션 컴포넌트입니다. 다양한 variant, 크기, 테마를 지원하며 접근성을 고려하여 구현되었습니다.

## 주요 기능
- 3가지 variant (primary, secondary, tertiary)
- 3가지 크기 (small, medium, large)
- 2가지 테마 (light, dark)
- 표시할 최대 페이지 수 설정 가능
- 비활성화 상태 지원
- 키보드 접근성 지원

## 사용 예시
\`\`\`tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log('Page changed to:', page)}
  variant="primary"
  size="medium"
  theme="light"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지 번호 (1부터 시작)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '전체 페이지 수',
    },
    onPageChange: {
      description: '페이지 변경 시 호출되는 콜백 함수',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '컴포넌트 variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '컴포넌트 크기',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마',
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 10 },
      description: '표시할 최대 페이지 번호 개수',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스명',
    },
  },
  args: {
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 5,
    disabled: false,
  },
};

// Variant 스토리들
export const Primary: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Secondary: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const Tertiary: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

// 크기 스토리들
export const Small: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// 테마 스토리들
export const LightTheme: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 특수 상황 스토리들
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 7,
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
};

// 최대 표시 페이지 수 변경
export const MaxVisiblePages3: Story = {
  name: 'Max Visible Pages: 3',
  args: {
    currentPage: 5,
    totalPages: 20,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 3,
  },
};

export const MaxVisiblePages7: Story = {
  name: 'Max Visible Pages: 7',
  args: {
    currentPage: 10,
    totalPages: 20,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    maxVisiblePages: 7,
  },
};

// 조합 스토리들
export const SecondaryLarge: Story = {
  name: 'Secondary + Large',
  args: {
    currentPage: 5,
    totalPages: 15,
    variant: 'secondary',
    size: 'large',
    theme: 'light',
  },
};

export const TertiarySmall: Story = {
  name: 'Tertiary + Small',
  args: {
    currentPage: 3,
    totalPages: 8,
    variant: 'tertiary',
    size: 'small',
    theme: 'light',
  },
};

export const DarkSecondary: Story = {
  name: 'Dark + Secondary',
  args: {
    currentPage: 4,
    totalPages: 12,
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DarkTertiary: Story = {
  name: 'Dark + Tertiary',
  args: {
    currentPage: 6,
    totalPages: 15,
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 인터랙티브 스토리
export const Interactive: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: '실제로 페이지를 변경해볼 수 있는 인터랙티브 스토리입니다. 페이지 번호나 화살표를 클릭해보세요.',
      },
    },
  },
};

// 모든 variant 비교
export const AllVariants: Story = {
  name: 'All Variants Comparison',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Primary</h3>
        <Pagination {...args} variant="primary" />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Secondary</h3>
        <Pagination {...args} variant="secondary" />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Tertiary</h3>
        <Pagination {...args} variant="tertiary" />
      </div>
    </div>
  ),
  args: {
    currentPage: 3,
    totalPages: 10,
    size: 'medium',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 variant를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 모든 크기 비교
export const AllSizes: Story = {
  name: 'All Sizes Comparison',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Small</h3>
        <Pagination {...args} size="small" />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Medium</h3>
        <Pagination {...args} size="medium" />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Large</h3>
        <Pagination {...args} size="large" />
      </div>
    </div>
  ),
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 크기를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 테마 비교
export const ThemeComparison: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ padding: '24px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '16px', textAlign: 'center', color: '#000000' }}>Light Theme</h3>
        <Pagination {...args} theme="light" />
      </div>
      <div style={{ padding: '24px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '16px', textAlign: 'center', color: '#ffffff' }}>Dark Theme</h3>
        <Pagination {...args} theme="dark" />
      </div>
    </div>
  ),
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'primary',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: '라이트 테마와 다크 테마를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

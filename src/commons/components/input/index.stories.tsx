import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Input> = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 입력 필드 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '입력 필드의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '입력 필드의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    required: {
      control: 'boolean',
      description: '라벨 필수 표시',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    helperText: {
      control: 'text',
      description: '헬퍼 텍스트',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
  },
  args: {
    placeholder: '회고를 남겨보세요.',
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
    label: 'Primary Input',
    placeholder: 'Primary 스타일 입력 필드',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Input',
    placeholder: 'Secondary 스타일 입력 필드',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    label: 'Tertiary Input',
    placeholder: 'Tertiary 스타일 입력 필드',
  },
};

// ========================================
// Size Variants
// ========================================

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Input',
    placeholder: '작은 크기 입력 필드',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Medium Input',
    placeholder: '중간 크기 입력 필드',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Input',
    placeholder: '큰 크기 입력 필드',
  },
};

// ========================================
// State Variants
// ========================================

export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력해주세요',
  },
};

export const Required: Story = {
  args: {
    label: '필수 입력 항목',
    required: true,
    placeholder: '필수 입력 필드',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '사용자명',
    placeholder: '사용자명을 입력해주세요',
    helperText: '영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.',
  },
};

export const Error: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    error: true,
    errorMessage: '올바른 이메일 형식이 아닙니다.',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 입력 필드',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: '전체 너비 입력 필드',
    placeholder: '전체 너비를 사용하는 입력 필드',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// ========================================
// Icon Variants
// ========================================

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력해주세요',
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    rightIcon: <EyeIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: '사용자 검색',
    placeholder: '사용자를 검색해주세요',
    leftIcon: <UserIcon />,
    rightIcon: <SearchIcon />,
  },
};

// ========================================
// Theme Variants
// ========================================

export const LightTheme: Story = {
  args: {
    theme: 'light',
    label: 'Light Theme',
    placeholder: '라이트 테마 입력 필드',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    label: 'Dark Theme',
    placeholder: '다크 테마 입력 필드',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// ========================================
// Input Type Variants
// ========================================

export const TextInput: Story = {
  args: {
    type: 'text',
    label: '텍스트 입력',
    placeholder: '텍스트를 입력해주세요',
  },
};

export const EmailInput: Story = {
  args: {
    type: 'email',
    label: '이메일',
    placeholder: 'example@email.com',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    label: '숫자',
    placeholder: '숫자를 입력해주세요',
  },
};

export const TelInput: Story = {
  args: {
    type: 'tel',
    label: '전화번호',
    placeholder: '010-1234-5678',
  },
};

export const UrlInput: Story = {
  args: {
    type: 'url',
    label: '웹사이트',
    placeholder: 'https://example.com',
  },
};

// ========================================
// Combination Stories
// ========================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Variants</h3>
        <Input variant="primary" label="Primary" placeholder="Primary 스타일" />
        <Input variant="secondary" label="Secondary" placeholder="Secondary 스타일" />
        <Input variant="tertiary" label="Tertiary" placeholder="Tertiary 스타일" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Sizes</h3>
        <Input size="small" label="Small" placeholder="작은 크기" />
        <Input size="medium" label="Medium" placeholder="중간 크기" />
        <Input size="large" label="Large" placeholder="큰 크기" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>States</h3>
        <Input label="Normal" placeholder="일반 상태" />
        <Input label="Required" required placeholder="필수 입력" />
        <Input label="With Helper" placeholder="헬퍼 텍스트" helperText="도움말 텍스트입니다." />
        <Input label="Error" error errorMessage="에러 메시지입니다." placeholder="에러 상태" />
        <Input label="Disabled" disabled placeholder="비활성화 상태" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizesWithVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '500px' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize' }}>
            {size} Size
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
              variant="primary"
              size={size}
              label={`Primary ${size}`}
              placeholder={`Primary ${size} 입력 필드`}
            />
            <Input
              variant="secondary"
              size={size}
              label={`Secondary ${size}`}
              placeholder={`Secondary ${size} 입력 필드`}
            />
            <Input
              variant="tertiary"
              size={size}
              label={`Tertiary ${size}`}
              placeholder={`Tertiary ${size} 입력 필드`}
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

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>회원가입 폼</h2>
      <Input
        label="이름"
        required
        placeholder="이름을 입력해주세요"
        leftIcon={<UserIcon />}
      />
      <Input
        type="email"
        label="이메일"
        required
        placeholder="example@email.com"
        helperText="로그인 시 사용할 이메일 주소를 입력해주세요."
      />
      <Input
        type="password"
        label="비밀번호"
        required
        placeholder="비밀번호를 입력해주세요"
        rightIcon={<EyeIcon />}
        helperText="영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요."
      />
      <Input
        type="password"
        label="비밀번호 확인"
        required
        placeholder="비밀번호를 다시 입력해주세요"
        rightIcon={<EyeIcon />}
      />
      <Input
        type="tel"
        label="전화번호"
        placeholder="010-1234-5678"
        helperText="선택사항입니다."
      />
    </form>
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
    label: '인터랙티브 입력 필드',
    placeholder: '여기에 입력해보세요',
    onChange: (e) => console.log('Input value:', e.target.value),
    onFocus: () => console.log('Input focused'),
    onBlur: () => console.log('Input blurred'),
  },
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Playground Input',
    placeholder: '플레이그라운드 입력 필드',
    fullWidth: false,
    error: false,
    disabled: false,
    required: false,
    helperText: '',
    errorMessage: '',
  },
};

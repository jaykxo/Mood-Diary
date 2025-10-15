import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Selectbox, SelectOption } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Selectbox> = {
  title: 'Commons/Components/Selectbox',
  component: Selectbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 셀렉트박스 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '셀렉트박스의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스의 크기',
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
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    value: {
      control: 'text',
      description: '현재 선택된 값',
    },
    defaultValue: {
      control: 'text',
      description: '기본 선택된 값',
    },
  },
  args: {
    placeholder: '선택하세요',
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Sample Data
// ========================================

const basicOptions: SelectOption[] = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
  { value: 'grape', label: '포도' },
];

const manyOptions: SelectOption[] = [
  { value: 'seoul', label: '서울특별시' },
  { value: 'busan', label: '부산광역시' },
  { value: 'daegu', label: '대구광역시' },
  { value: 'incheon', label: '인천광역시' },
  { value: 'gwangju', label: '광주광역시' },
  { value: 'daejeon', label: '대전광역시' },
  { value: 'ulsan', label: '울산광역시' },
  { value: 'sejong', label: '세종특별자치시' },
  { value: 'gyeonggi', label: '경기도' },
  { value: 'gangwon', label: '강원특별자치도' },
];

const optionsWithDisabled: SelectOption[] = [
  { value: 'available1', label: '사용 가능한 옵션 1' },
  { value: 'disabled1', label: '비활성화된 옵션 1', disabled: true },
  { value: 'available2', label: '사용 가능한 옵션 2' },
  { value: 'disabled2', label: '비활성화된 옵션 2', disabled: true },
  { value: 'available3', label: '사용 가능한 옵션 3' },
];

// ========================================
// Basic Stories
// ========================================

export const Default: Story = {
  args: {
    options: basicOptions,
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    options: basicOptions,
    placeholder: 'Primary 스타일 선택',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    options: basicOptions,
    placeholder: 'Secondary 스타일 선택',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    options: basicOptions,
    placeholder: 'Tertiary 스타일 선택',
  },
};

// ========================================
// Size Variants
// ========================================

export const Small: Story = {
  args: {
    size: 'small',
    options: basicOptions,
    placeholder: '작은 크기 선택',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    options: basicOptions,
    placeholder: '중간 크기 선택',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    options: basicOptions,
    placeholder: '큰 크기 선택',
  },
};

// ========================================
// State Variants
// ========================================

export const WithDefaultValue: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'banana',
    placeholder: '기본값이 설정된 선택',
  },
};

export const WithControlledValue: Story = {
  args: {
    options: basicOptions,
    value: 'orange',
    placeholder: '제어된 값 선택',
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    placeholder: '비활성화된 선택',
  },
};

export const DisabledWithValue: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    defaultValue: 'apple',
    placeholder: '값이 있는 비활성화된 선택',
  },
};

export const FullWidth: Story = {
  args: {
    options: basicOptions,
    fullWidth: true,
    placeholder: '전체 너비 선택',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    placeholder: '일부 옵션이 비활성화된 선택',
  },
};

// ========================================
// Content Variants
// ========================================

export const ManyOptions: Story = {
  args: {
    options: manyOptions,
    placeholder: '많은 옵션이 있는 선택 (스크롤)',
  },
};

export const LongLabels: Story = {
  args: {
    options: [
      { value: 'short', label: '짧은 라벨' },
      { value: 'medium', label: '조금 더 긴 라벨입니다' },
      { value: 'long', label: '매우 긴 라벨로 텍스트가 잘릴 수 있는 경우를 테스트합니다' },
      { value: 'very-long', label: '정말로 매우 긴 라벨로 텍스트 오버플로우와 말줄임표 처리를 확인하기 위한 테스트용 라벨입니다' },
    ],
    placeholder: '긴 라벨 테스트',
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: '옵션이 없는 선택',
  },
};

// ========================================
// Theme Variants
// ========================================

export const LightTheme: Story = {
  args: {
    theme: 'light',
    options: basicOptions,
    placeholder: '라이트 테마 선택',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    options: basicOptions,
    placeholder: '다크 테마 선택',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Variants</h3>
        <Selectbox variant="primary" options={basicOptions} placeholder="Primary 스타일" />
        <Selectbox variant="secondary" options={basicOptions} placeholder="Secondary 스타일" />
        <Selectbox variant="tertiary" options={basicOptions} placeholder="Tertiary 스타일" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Sizes</h3>
        <Selectbox size="small" options={basicOptions} placeholder="작은 크기" />
        <Selectbox size="medium" options={basicOptions} placeholder="중간 크기" />
        <Selectbox size="large" options={basicOptions} placeholder="큰 크기" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>States</h3>
        <Selectbox options={basicOptions} placeholder="일반 상태" />
        <Selectbox options={basicOptions} defaultValue="banana" placeholder="기본값 설정" />
        <Selectbox options={optionsWithDisabled} placeholder="일부 옵션 비활성화" />
        <Selectbox options={basicOptions} disabled placeholder="전체 비활성화" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizesWithVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', textTransform: 'capitalize' }}>
            {size} Size
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Selectbox
              variant="primary"
              size={size}
              options={basicOptions}
              placeholder={`Primary ${size} 선택`}
            />
            <Selectbox
              variant="secondary"
              size={size}
              options={basicOptions}
              placeholder={`Secondary ${size} 선택`}
            />
            <Selectbox
              variant="tertiary"
              size={size}
              options={basicOptions}
              placeholder={`Tertiary ${size} 선택`}
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
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>설문조사 폼</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1c1c1c' }}>
          좋아하는 과일을 선택해주세요
        </label>
        <Selectbox
          options={[
            { value: 'apple', label: '사과' },
            { value: 'banana', label: '바나나' },
            { value: 'orange', label: '오렌지' },
            { value: 'grape', label: '포도' },
            { value: 'strawberry', label: '딸기' },
          ]}
          placeholder="과일을 선택하세요"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1c1c1c' }}>
          거주 지역을 선택해주세요
        </label>
        <Selectbox
          options={manyOptions}
          placeholder="지역을 선택하세요"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1c1c1c' }}>
          연령대를 선택해주세요
        </label>
        <Selectbox
          variant="secondary"
          options={[
            { value: '10s', label: '10대' },
            { value: '20s', label: '20대' },
            { value: '30s', label: '30대' },
            { value: '40s', label: '40대' },
            { value: '50s', label: '50대' },
            { value: '60plus', label: '60대 이상' },
          ]}
          placeholder="연령대를 선택하세요"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1c1c1c' }}>
          직업을 선택해주세요 (선택사항)
        </label>
        <Selectbox
          variant="tertiary"
          size="small"
          options={[
            { value: 'student', label: '학생' },
            { value: 'office', label: '사무직' },
            { value: 'service', label: '서비스업' },
            { value: 'freelancer', label: '프리랜서' },
            { value: 'etc', label: '기타' },
          ]}
          placeholder="직업을 선택하세요 (선택사항)"
        />
      </div>
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
    options: basicOptions,
    placeholder: '인터랙티브 선택',
    onChange: (value, option) => {
      console.log('Selected value:', value);
      console.log('Selected option:', option);
    },
    onToggle: (isOpen) => {
      console.log('Dropdown is open:', isOpen);
    },
  },
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    options: basicOptions,
    placeholder: '플레이그라운드 선택',
    fullWidth: false,
    disabled: false,
    value: '',
    defaultValue: '',
  },
};

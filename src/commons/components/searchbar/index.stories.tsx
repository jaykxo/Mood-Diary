import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchBar } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof SearchBar> = {
  title: 'Commons/Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 검색바 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '검색바의 크기',
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
    showSearchIcon: {
      control: 'boolean',
      description: '검색 아이콘 표시 여부',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    containerClassName: {
      control: 'text',
      description: '컨테이너 클래스명',
    },
    onSearch: {
      action: 'searched',
      description: '검색 버튼 클릭 핸들러',
    },
    onIconClick: {
      action: 'icon-clicked',
      description: '검색 아이콘 클릭 핸들러',
    },
  },
  args: {
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: 'Primary 스타일 검색바',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary 스타일 검색바',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary 스타일 검색바',
  },
};

// ========================================
// Size Variants
// ========================================

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: '작은 크기 검색바',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: '중간 크기 검색바',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: '큰 크기 검색바',
  },
};

// ========================================
// State Variants
// ========================================

export const WithoutSearchIcon: Story = {
  args: {
    showSearchIcon: false,
    placeholder: '검색 아이콘이 없는 검색바',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 검색바',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: '전체 너비를 사용하는 검색바',
  },
  parameters: {
    layout: 'padded',
  },
};

// ========================================
// Theme Variants
// ========================================

export const LightTheme: Story = {
  args: {
    theme: 'light',
    placeholder: '라이트 테마 검색바',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    placeholder: '다크 테마 검색바',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Variants</h3>
        <SearchBar variant="primary" placeholder="Primary 스타일" />
        <SearchBar variant="secondary" placeholder="Secondary 스타일" />
        <SearchBar variant="tertiary" placeholder="Tertiary 스타일" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Sizes</h3>
        <SearchBar size="small" placeholder="작은 크기" />
        <SearchBar size="medium" placeholder="중간 크기" />
        <SearchBar size="large" placeholder="큰 크기" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>States</h3>
        <SearchBar placeholder="일반 상태" />
        <SearchBar showSearchIcon={false} placeholder="아이콘 없음" />
        <SearchBar disabled placeholder="비활성화 상태" />
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
            <SearchBar
              variant="primary"
              size={size}
              placeholder={`Primary ${size} 검색바`}
            />
            <SearchBar
              variant="secondary"
              size={size}
              placeholder={`Secondary ${size} 검색바`}
            />
            <SearchBar
              variant="tertiary"
              size={size}
              placeholder={`Tertiary ${size} 검색바`}
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

export const SearchExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>검색 예제</h2>
      <SearchBar
        placeholder="상품을 검색해보세요"
        onSearch={(value) => console.log('상품 검색:', value)}
      />
      <SearchBar
        variant="secondary"
        placeholder="사용자를 검색해보세요"
        onSearch={(value) => console.log('사용자 검색:', value)}
      />
      <SearchBar
        variant="tertiary"
        size="large"
        placeholder="문서를 검색해보세요"
        onSearch={(value) => console.log('문서 검색:', value)}
      />
      <SearchBar
        showSearchIcon={false}
        placeholder="아이콘 없는 검색바"
        onSearch={(value) => console.log('검색:', value)}
      />
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
    placeholder: '인터랙티브 검색바',
    onSearch: (value) => console.log('검색 실행:', value),
    onIconClick: () => console.log('검색 아이콘 클릭'),
    onChange: (e) => console.log('입력 값 변경:', e.target.value),
    onFocus: () => console.log('검색바 포커스'),
    onBlur: () => console.log('검색바 블러'),
  },
};

export const WithCustomHandlers: Story = {
  args: {
    placeholder: '커스텀 핸들러가 있는 검색바',
    onSearch: (value) => {
      if (value.trim()) {
        alert(`검색어: "${value}"`);
      } else {
        alert('검색어를 입력해주세요.');
      }
    },
    onIconClick: () => {
      alert('검색 아이콘이 클릭되었습니다!');
    },
  },
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '플레이그라운드 검색바',
    fullWidth: false,
    disabled: false,
    showSearchIcon: true,
    containerClassName: '',
  },
};

// ========================================
// Advanced Usage Stories
// ========================================

export const ResponsiveExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>반응형 검색바</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '200px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>작은 화면 (200px)</p>
          <SearchBar size="small" placeholder="작은 화면용" fullWidth />
        </div>
        <div style={{ width: '400px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>중간 화면 (400px)</p>
          <SearchBar size="medium" placeholder="중간 화면용" fullWidth />
        </div>
        <div style={{ width: '600px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>큰 화면 (600px)</p>
          <SearchBar size="large" placeholder="큰 화면용" fullWidth />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>Light Theme</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
          <SearchBar theme="light" variant="primary" placeholder="Primary Light" />
          <SearchBar theme="light" variant="secondary" placeholder="Secondary Light" />
          <SearchBar theme="light" variant="tertiary" placeholder="Tertiary Light" />
        </div>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Dark Theme</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
          <SearchBar theme="dark" variant="primary" placeholder="Primary Dark" />
          <SearchBar theme="dark" variant="secondary" placeholder="Secondary Dark" />
          <SearchBar theme="dark" variant="tertiary" placeholder="Tertiary Dark" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

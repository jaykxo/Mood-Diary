import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Modal } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Modal> = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 상황에서 사용할 수 있는 모달 컴포넌트입니다. 정보 표시, 확인/취소 액션, 경고 메시지 등을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'danger'],
      description: '모달의 시각적 스타일 변형',
    },
    actions: {
      control: 'select',
      options: ['single', 'dual'],
      description: '버튼 액션 타입',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '모달의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 (light/dark)',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    title: {
      control: 'text',
      description: '모달 제목',
    },
    content: {
      control: 'text',
      description: '모달 내용',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트 (dual actions일 때만 사용)',
    },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
    onClose: { action: 'closed' },
  },
  args: {
    title: '모달 제목',
    content: '모달 내용이 여기에 표시됩니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Stories
// ========================================

// 기본 모달 (Info, Single Action, Medium)
export const Default: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    size: 'medium',
    theme: 'light',
    fullWidth: false,
    disabled: false,
  },
};

// 위험 모달 (Danger, Single Action)
export const Danger: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    size: 'medium',
    theme: 'light',
    title: '삭제 확인',
    content: '정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    confirmText: '삭제',
  },
};

// 듀얼 액션 모달 (Info, Dual Action)
export const DualAction: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    size: 'medium',
    theme: 'light',
    title: '변경사항 저장',
    content: '변경사항을 저장하시겠습니까?',
    confirmText: '저장',
    cancelText: '취소',
  },
};

// 듀얼 액션 위험 모달 (Danger, Dual Action)
export const DualActionDanger: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    size: 'medium',
    theme: 'light',
    title: '계정 삭제',
    content: '계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 계속하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

// 크기 변형들
export const Small: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    size: 'small',
    theme: 'light',
    title: '작은 모달',
    content: '작은 크기의 모달입니다.',
  },
};

export const Large: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    size: 'large',
    theme: 'light',
    title: '큰 모달',
    content: '큰 크기의 모달입니다. 더 많은 내용을 표시할 수 있습니다.',
  },
};

// 테마 변형들
export const DarkTheme: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    size: 'medium',
    theme: 'dark',
    title: '다크 테마 모달',
    content: '다크 테마로 표시되는 모달입니다.',
  },
};

export const DarkThemeDanger: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    size: 'medium',
    theme: 'dark',
    title: '다크 테마 위험 모달',
    content: '다크 테마의 위험 모달입니다.',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

// 전체 너비 모달
export const FullWidth: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    size: 'medium',
    theme: 'light',
    fullWidth: true,
    title: '전체 너비 모달',
    content: '전체 너비를 사용하는 모달입니다.',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    size: 'medium',
    theme: 'light',
    disabled: true,
    title: '비활성화된 모달',
    content: '비활성화된 상태의 모달입니다.',
  },
};

// 듀얼 액션 비활성화
export const DualActionDisabled: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    size: 'medium',
    theme: 'light',
    disabled: true,
    title: '비활성화된 듀얼 액션 모달',
    content: '비활성화된 듀얼 액션 모달입니다.',
    confirmText: '저장',
    cancelText: '취소',
  },
};

// 긴 텍스트 모달
export const LongText: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    size: 'large',
    theme: 'light',
    title: '긴 텍스트가 포함된 모달',
    content: '이 모달은 긴 텍스트를 포함하고 있습니다. 여러 줄의 내용을 표시할 수 있으며, 사용자에게 상세한 정보를 제공할 수 있습니다. 모달의 크기와 스타일이 텍스트 길이에 따라 어떻게 조정되는지 확인할 수 있습니다.',
    confirmText: '이해했습니다',
    cancelText: '닫기',
  },
};

// 모든 옵션 조합 (대화형)
export const Interactive: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    size: 'medium',
    theme: 'light',
    fullWidth: false,
    disabled: false,
    title: '대화형 모달',
    content: 'Controls 패널에서 다양한 옵션을 조정해보세요.',
    confirmText: '확인',
    cancelText: '취소',
  },
};
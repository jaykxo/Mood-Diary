import React from 'react';
import DiariesDetail from '@/components/diaries-detail';

interface PageProps {
  params: {
    id: string;
  };
}

const DiaryDetailPage: React.FC<PageProps> = () => {
  return (
    <div data-testid="diary-detail-page">
      <DiariesDetail />
    </div>
  );
};

export default DiaryDetailPage;

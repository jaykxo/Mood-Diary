import React from 'react';
import DiariesDetail from '@/components/diaries-detail';

interface PageProps {
  params: {
    id: string;
  };
}

const DiaryDetailPage: React.FC<PageProps> = () => {
  return (
    <div>
      <DiariesDetail />
    </div>
  );
};

export default DiaryDetailPage;

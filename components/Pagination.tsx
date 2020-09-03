import React from 'react';
import { Row, FlexibleSpacer } from './Layout';
import Link from './Link';
import { useTheme } from './Theming';

interface PaginationProps {
  newerPostsPageNumber?: number;
  olderPostsPageNumber?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  newerPostsPageNumber,
  olderPostsPageNumber,
}) => {
  const theme = useTheme();

  return (
    <Row
      css={{
        width: '100%',
      }}>
      {!!newerPostsPageNumber && (
        <Link href='/page/[pageNumber]' as={`/page/${newerPostsPageNumber}`}>
          ← Newer posts
        </Link>
      )}

      <FlexibleSpacer />

      {!!olderPostsPageNumber && (
        <Link href='/page/[pageNumber]' as={`/page/${olderPostsPageNumber}`}>
          Older posts →
        </Link>
      )}
    </Row>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;

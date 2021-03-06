import React from 'react';
import { GetStaticProps } from 'next';
import _groupBy from 'lodash/groupBy';
import moment from 'moment';

import { Post } from '../interfaces';
import PageTemplate from '../components/PageTemplate';
import { getAllPosts } from '../utils/getAllPosts';
import { Spacer, Column, Row } from '../components/Layout';
import Link from '../components/Link';
import siteConfig from '../siteconfig.json';

import styles from '../styles/Archive.module.scss';

interface ArchiveProps {
  posts: Post[];
}

const Archive: React.FC<ArchiveProps> = ({ posts }) => {
  const groupedPosts: { [year: string]: Post[] } = posts.reduce(
    (grouped, post) => {
      const [year] = post.date.split('-');
      const yearEntries = grouped[year] || [];
      yearEntries.push(post);
      return {
        ...grouped,
        [year]: yearEntries,
      };
    },
    {}
  );

  return (
    <PageTemplate
      title='Archive'
      description={`A list of every post written by ${siteConfig.author}.`}>
      <Column>
        <h1>Archive</h1>
        <Spacer height={16} />
        <p>This is a list of every post I've written on this site.</p>
        <Spacer height={48} />
        <Column gridGap={48}>
          {Object.entries(groupedPosts)
            .reverse()
            .map(([year, posts]) => (
              <Column gridGap={16} key={year}>
                <h2>{year}</h2>
                <ul style={{ paddingLeft: 0 }} role='list'>
                  {posts.map(({ title, date, url }) => (
                    <li key={url} className={styles.posts}>
                      <Row alignItems='flex-start'>
                        <span className={styles.date}>
                          {moment(date).format('MMM DD')}
                        </span>
                        <div>
                          <Link href='/[...slug]' as={url}>
                            {title}
                          </Link>
                        </div>
                      </Row>
                    </li>
                  ))}
                </ul>
              </Column>
            ))}
        </Column>
      </Column>
    </PageTemplate>
  );
};

export default Archive;

export const getStaticProps: GetStaticProps<ArchiveProps> = async () => ({
  props: {
    posts: getAllPosts(),
  },
});

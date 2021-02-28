import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import PageTemplate from '../components/PageTemplate';
import Markdown from '../components/Markdown';
import { parsePageContent } from '../utils/parsePageContent';
import { getAllPages } from '../utils/getAllPages';
import { Column, Spacer } from '../components/Layout';
import { getExcerpt } from '../utils/getExcerpt';

interface PageUrlQuery {
  slug: string;
  [key: string]: string;
}

interface PageProps {
  title: string;
  body: string;
  url: string;
}

const Page = ({ title, body, url }: PageProps) => {
  const bodyWithoutTitle = body.split('\n\n').slice(1).join('\n\n');
  const description = getExcerpt({ body: bodyWithoutTitle, maxWordCount: 50 });

  return (
    <PageTemplate title={title} description={description} url={url}>
      <Column>
        <Markdown source={body} />
      </Column>
    </PageTemplate>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps, PageUrlQuery> = async ({
  ...ctx
}) => {
  const { slug } = ctx.params;

  const content = await import(`../pageContent/${slug}.md`);

  const page = parsePageContent(content, slug);

  return {
    props: {
      ...page,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key) => {
      return key.replace(/^.*[\\\/]/, '').slice(0, -3);
    });
    return data;
  })(require.context('../pageContent', true, /\.md$/));

  const paths = getAllPages().map((page) => page.url);

  return {
    paths,
    fallback: false,
  };
};

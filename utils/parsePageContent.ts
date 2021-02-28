import matter from 'gray-matter';

export const parsePageContent = (content: any, slug: string) => {
  const data = matter(content.default);

  return {
    title: data.data.title,
    body: data.content,
    colour: data.data.colour || '',
    url: `/${slug}`,
  };
};

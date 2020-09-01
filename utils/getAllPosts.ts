import { parsePostContent } from './parsePostContent';

export const getAllPosts = () => {
  return ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);

      const content = values[index] as any;

      const post = parsePostContent(content, slug);

      return {
        ...post,
      };
    });
    return data;
  })(require.context('../posts', true, /\.md$/));
};

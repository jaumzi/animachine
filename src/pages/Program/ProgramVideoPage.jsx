import React, { memo } from 'react';
import { Box, Grid } from '@material-ui/core';
import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import PostCard from 'components/Card/PostCard';
import SubPostCard from 'components/Card/SubPostCard';
import AdminLayout from 'layout/Admin/AdminLayout';

function ProgramVideoPage() {

  const breadcrumbs = [
    {
      name: 'Início',
      link: '/',
    },
  ];

  const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageText: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageText: 'Image Text',
    },
  ];
  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
  };

  return (
    <>
      <AdminLayout>
        <Box my={2}>
          <Box marginBottom={4} >
            <BreadCrumb
              data={breadcrumbs}
            />
          </Box>

          <PostCard post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <SubPostCard key={post.title} post={post} />
            ))}
          </Grid>

        </Box>
      </AdminLayout>
    </>
  );
}

export default memo(ProgramVideoPage);

import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  )
}

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          //   justifyContent: 'space-between',
          margin: 5,
          alignItems: 'center',
        }}
      >
        <Image source={{ uri: post.profile_picture }} style={styles.story} />
        <Text style={{ color: '#fff', marginLeft: 5, fontWeight: '700' }}>
          {post.user}
        </Text>
      </View>

      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
        ...
      </Text>
    </View>
  )
}

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: '100%', resizeMode: 'contain' }}
    />
  </View>
)

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  shareIcon: {
    transform: [{ rotate: '310deg' }],
    marginTop: -2,
    marginLeft: 4,
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
  },
})

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/30/ffffff/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/ios-glyphs/60/fa314a/like--v1.png',
  },
  {
    name: 'Comment',
    imageUrl:
      'https://img.icons8.com/material-outlined/50/ffffff/filled-topic.png',
  },
  {
    name: 'Share',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/sent.png',
  },
  {
    name: 'Save',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/48/ffffff/bookmark-ribbon--v1.png',
  },
]

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image source={{ uri: imgUrl }} style={imgStyle} />
  </TouchableOpacity>
)

const PostFooter = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={styles.leftFooterIconsContainer}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon
        imgStyle={[styles.footerIcon, styles.shareIcon]}
        imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
)

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4 }}>
    <Text style={{ color: '#fff', fontWeight: '600' }}>
      {post.likes.toLocaleString('en')} likes
    </Text>
  </View>
)

const Caption = ({ post }) => (
  <Text style={{ color: 'white' }}>
    <Text style={{ fontWeight: 'bold' }}>{post.user}</Text>
    {' ' + post.caption}
  </Text>
)

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: 'gray' }}>
        View{' '}
        {post.comments.length > 1
          ? 'all ' + post.comments.length + ' comments'
          : 'comment'}
      </Text>
    )}
  </View>

  // Double negation returns false or true as a boolean value where as length return 1 or 0
)

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: 'bold' }}>{comment.user}</Text>
          <Text>{' ' + comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
)

export default Post

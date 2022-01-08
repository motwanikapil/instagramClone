import { USERS } from './users'

export const POSTS = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFwcHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    user: USERS[0].user,
    likes: 7870,
    caption: 'Train Ride to Hogwarts 😂',
    profile_picture: USERS[0].image,
    comments: [
      {
        user: 'emmawatson',
        comment: 'Your Photo Looks Fire!!',
      },
      {
        user: 'smritimandhana',
        comment: 'Nice Pic!',
      },
    ],
  },
  {
    imageUrl: 'https://pbs.twimg.com/media/EwnQVEoXIAcxZuu.jpg',
    user: USERS[1].user,
    likes: 10320,
    caption: 'Just Levitating!😂',
    profile_picture: USERS[1].image,
    comments: [
      {
        user: 'arianagrande',
        comment: 'Hey Girl! Wanna Catch Up Tonight!!',
      },
      {
        user: 'smritimandhana',
        comment: 'Nice Pic!',
      },
    ],
  },
]

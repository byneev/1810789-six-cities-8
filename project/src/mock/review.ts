import type { HostProps } from './offer';


export type ReviewProp = {
    comment: string,
    date: string,
    id: number,
    rating: number,
    user: HostProps
}

export const reviews:ReviewProp[] = [
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': '2019-05-08T14:13:56.569Z',
    'id': 1,
    'rating': 1,
    'user': {
      'avatarUrl': 'img/1.png',
      'id': 7,
      'isPro': false,
      'name': 'Max',
    },
  },
  {
    'comment': 'Omg I am so scared about this room',
    'date': '2019-04-08T14:13:56.569Z',
    'id': 2,
    'rating': 2,
    'user': {
      'avatarUrl': 'img/7.png',
      'id': 12,
      'isPro': true,
      'name': 'Petr',
    },
  },
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': '2019-05-11T14:13:56.569Z',
    'id': 3,
    'rating': 5,
    'user': {
      'avatarUrl': 'img/2.png',
      'id': 2,
      'isPro': false,
      'name': 'Avraam',
    },
  },
  {
    'comment': 'What a beautiful place full of old womans and cats',
    'date': '2018-03-21T14:13:56.569Z',
    'id': 4,
    'rating': 3,
    'user': {
      'avatarUrl': 'img/9.png',
      'id': 11,
      'isPro': false,
      'name': 'Bidjo',
    },
  },
];

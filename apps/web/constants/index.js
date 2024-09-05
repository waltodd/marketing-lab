import { createCampaign, dashboard, logout, payment, profile, withdraw } from '@/assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];

export const rolesArray = [
  {
    id:'faf9b3cf-f8d9-45ff-b34b-2872fe76970b',
    role:"influencer",
    label:"Influenciador(a)"
  },
  {
    id:'20d72162-9734-4837-b8e8-be5c74b73fe6',
    role:"sponsor",
    label:"Patrocinador(a)"
  }
]


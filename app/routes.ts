import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('member/:memberHandle', 'routes/member.tsx'),
  route('group-view', 'routes/groupView.tsx'),
] satisfies RouteConfig;

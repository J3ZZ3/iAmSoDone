import { Text } from 'react-native';
import { Redirect, Stack, usePathname } from 'expo-router';

import { useSession } from '@/ctx';
import { useEffect } from 'react';

export default function AppLayout() {
  // console.log(usePathname());
  const pathname = usePathname();
  const authRoutes = ['/sign-in', '/register'];
  
  const { session, isLoading } = useSession();
  useEffect(() => {
    console.log({ session });
    
  }, [session]);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session && !authRoutes.includes(pathname)) {

  //   // On web, static rendering will stop here as the user is not authenticated
  //   // in the headless Node process that the pages are rendered in.
    return <Redirect href={{ pathname: "/sign-in"}} />;
  }
  if (session && authRoutes.includes(pathname)) {
    return <Redirect href={{ pathname: "/Register"}} />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}

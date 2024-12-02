import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/ctx';

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          router.replace('/sign-in');
        }}>
        Sign in now
      </Text>
    </View>
  );
}

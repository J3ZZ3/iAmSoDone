import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UserProfile } from '@clerk/clerk-expo';

const Profile = () => {
  return (
    <View style={styles.container}>
      <UserProfile 
        appearance={{
          elements: {
            card: {
              borderRadius: 8,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Profile;
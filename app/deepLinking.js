import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useDeepLinking = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url;
      console.log('Deep link received:', url);

      if (url) {
        const route = url.replace('myapp://', ''); // Extract route
        navigation.navigate(route);
      }
    };

    // Fetch the initial URL if app was opened from a deep link
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink({ url: initialUrl });
      }
    };

    getInitialUrl(); // Handle case where app is opened via deep link

    // Subscribe to deep link event listener
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove(); // Clean up the event listener
    };
  }, [navigation]);

  return null;
};

export default useDeepLinking;

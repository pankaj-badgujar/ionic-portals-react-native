/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import {
  EmitterSubscription,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  register,
  addPortal,
  subscribe,
  publish,
  Message,
  PortalView,
} from '@ionic/portals-react-native';

register('YOUR_PORTAL_KEY_HERE');

const portal = {
  name: 'button',
  startDir: 'portals/buttonapp',
  initialContext: {
    initialNumber: 2,
  },
  plugins: [
    {
      androidClassPath: 'com.capacitorjs.plugins.camera.CameraPlugin',
      iosClassName: 'CAPCameraPlugin',
    },
  ],
};

addPortal(portal);

const PubSubLabel: React.FC<{ initialNumber: number }> = ({
  initialNumber,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [immutableNumber, setNumber] = useState(initialNumber);
  const subRef = useRef<EmitterSubscription | null>(null);
  const number = useRef(initialNumber);

  useEffect(() => {
    subRef.current = subscribe('console:log', (message: Message) => {
      console.log(
        `Received message ${JSON.stringify(message.data, null, 2)} on topic ${
          message.topic
        } from IonicPortals`,
      );
    });

    return () => {
      console.log('Unsubscribing from ref ', subRef);
      subRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    subRef.current = subscribe('button:tapped', (message: Message) => {
      console.log(
        `Received message ${JSON.stringify(message.data, null, 2)} on topic ${
          message.topic
        } from IonicPortals`,
      );

      number.current = number.current + 1;
      setNumber(number.current);

      publish('button:received', number.current + 1);
      if (number.current >= 5) {
        subRef.current?.remove();
      }
    });

    return () => {
      console.log('Unsubscribing from ref ', subRef);
      subRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    subRef.current = subscribe('openCameraButton:tapped', (message: Message) => {
      console.log(
        `Received message ${JSON.stringify(message.data, null, 2)} on topic ${
          message.topic
        } from IonicPortals`,
      );

      // we need to open native camera here
      console.log('now opening camera');
      takePicture();
    });

    return () => {
      console.log('Unsubscribing from ref ', subRef);
      subRef.current?.remove();
    };
  }, []);

const takePicture = async () => {
  console.log('inside takePicture');
  try{
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    console.log('after taking picture: ', image);
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    console.log('imageUrl: ', image.webPath);
  } catch (error) {
    console.error('error taking picture: ', error);
  }
};

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionDescription,
          { color: isDarkMode ? Colors.white : Colors.black },
        ]}>
        React Native Current Number: {immutableNumber}
      </Text>
    </View>
  );
};

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <PubSubLabel initialNumber={1} />
          <PortalView
            portal={{ name: 'button' }}
            style={{ flex: 1, height: 150 }}
          />
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

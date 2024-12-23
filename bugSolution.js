// bugSolution.js
import * as React from 'react';
import { Camera, useCameraDevices } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const devices = useCameraDevices();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.takePictureAsync();
        // Add URI validation here
        if (photo && photo.uri && photo.uri.startsWith('file://')) {
          setPhoto(photo);
        } else {
          alert('Error: Corrupted or invalid image URI.');
        }
      } catch (error) {
        console.error('Camera error:', error);
        alert('Camera error: ' + error.message);
      }
    }
  };

  let cameraRef = null; // add camera reference
  if (hasPermission === null) {
    return <View />; 
  } 
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } 
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => { cameraRef = ref; }}>
      </Camera> 
      <Button title="Take Picture" onPress={takePicture} />
      {photo && (
        <Image source={{ uri: photo.uri }} style={styles.image} />
      )}
    </View>
  );
};
export default App; 
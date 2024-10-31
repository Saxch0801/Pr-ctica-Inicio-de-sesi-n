import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUri, setImageUri] = useState(
    'https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg'
  );

  const pickerImageGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const pickerImageFoto = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permisos son requeridos');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage({ localUri: pickerResult.uri });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        
        <TouchableOpacity onPress={pickerImageGaleria}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Sharing.shareAsync(imageUri)} style={styles.button3}>
          <Text style={styles.buttontext}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => pickerImageFoto(true)}>
          <Text style={styles.buttontext}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>
        
        <View style={styles.subcontainer2}>
          <Text style={styles.subtitle}>Nombre de usuario:</Text>
          <TextInput style={styles.input} placeholder='Nombre' />
          
          <Text style={styles.subtitle}>Contraseña:</Text>
          <TextInput style={styles.input} placeholder='Contraseña' secureTextEntry />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Usuario Registrado')}>
          <Text style={styles.buttontext}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer: {
    borderColor: '#ccc',
    backgroundColor: '#232323',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 50,
  },
  subcontainer2: {
    marginTop: 25,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'monospace',
    color: '#ccc',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#666',
  },
  image: {
    height: 180,
    width: 180,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 3,
  },
  input: {
    padding: 5,
    height: 25,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    color: '#333',
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  button: {
    height: 30,
    width: 90,
    backgroundColor: '#0a10dd',
    borderRadius: 8,
    borderColor: '#0a10dd',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    height: 30,
    width: 120,
    backgroundColor: '#6f35ca',
    borderRadius: 8,
    borderColor: '#6f35ca',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button3: {
    padding: 5,
    marginBottom: 50,
    height: 30,
    width: 90,
    backgroundColor: '#6f35ca',
    borderRadius: 8,
    borderColor: '#6f35ca',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: '#f0f0f0',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default App;



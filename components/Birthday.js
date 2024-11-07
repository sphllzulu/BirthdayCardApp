// import React, { useState } from 'react';
// import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
// import { IconButton, Portal, Modal } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import { useFonts } from 'expo-font';

// const COLORS = {
//   primary: '#4A6741',
//   secondary: '#8BA888',
//   grey: '#484848',
//   lightGrey: '#E8E8E8',
//   white: '#FFFFFF',
// };

// const BirthdayCard = () => {
//   // Remove the font loading requirement initially
//   const [cardState, setCardState] = useState({
//     text: '',
//     image: null,
//     fontSize: 20,
//     isBold: false,
//     textColor: COLORS.grey,
//   });
  
//   const [isFormatModalVisible, setFormatModalVisible] = useState(false);

//   const pickImage = async () => {
//     try {
//       const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
//       if (permissionResult.granted === false) {
//         alert('Permission to access camera roll is required!');
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setCardState(prev => ({ ...prev, image: result.uri }));
//       }
//     } catch (error) {
//       alert('Error picking image: ' + error.message);
//     }
//   };

//   const updateTextFormat = (updates) => {
//     setCardState(prev => ({ ...prev, ...updates }));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.cardContainer}>
//         {cardState.image ? (
//           <Image source={{ uri: cardState.image }} style={styles.image} />
//         ) : (
//           <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
//             <Text style={styles.placeholderText}>Tap to add an image</Text>
//           </TouchableOpacity>
//         )}

//         <View style={styles.textContainer}>
//           <TextInput
//             style={[styles.textInput]}
//             placeholder="Write your birthday message..."
//             value={cardState.text}
//             onChangeText={(text) => updateTextFormat({ text })}
//             multiline
//           />
//         </View>

//         <View style={styles.toolbar}>
//           <IconButton
//             icon="format-bold"
//             size={24}
//             color={cardState.isBold ? COLORS.primary : COLORS.grey}
//             onPress={() => updateTextFormat({ isBold: !cardState.isBold })}
//           />
//           <IconButton
//             icon="format-size"
//             size={24}
//             color={COLORS.grey}
//             onPress={() => setFormatModalVisible(true)}
//           />
//           <IconButton
//             icon="image"
//             size={24}
//             color={COLORS.grey}
//             onPress={pickImage}
//           />
//         </View>

//         <Text
//           style={[
//             styles.cardText,
//             {
//               fontSize: cardState.fontSize,
//               color: cardState.textColor,
//               fontWeight: cardState.isBold ? 'bold' : 'normal',
//             },
//           ]}
//         >
//           {cardState.text}
//         </Text>
//       </View>

//       <Portal>
//         <Modal
//           visible={isFormatModalVisible}
//           onDismiss={() => setFormatModalVisible(false)}
//           contentContainerStyle={styles.modal}
//         >
//           <Text style={styles.modalTitle}>Text Formatting</Text>
//           <View style={styles.formatOption}>
//             <Text>Font Size</Text>
//             <View style={styles.buttonGroup}>
//               {[16, 20, 24, 28, 32].map((size) => (
//                 <TouchableOpacity
//                   key={size}
//                   style={[
//                     styles.sizeButton,
//                     cardState.fontSize === size && styles.selectedButton,
//                   ]}
//                   onPress={() => updateTextFormat({ fontSize: size })}
//                 >
//                   <Text style={styles.buttonText}>{size}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </Modal>
//       </Portal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.lightGrey,
//   },
//   cardContainer: {
//     margin: 16,
//     padding: 16,
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     boxShadowColor: '#000',
//     boxShadowOffset: { width: 0, height: 2 },
//     boxShadowOpacity: 0.1,
//     boxShadowRadius: 4,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   imagePlaceholder: {
//     width: '100%',
//     height: 250,
//     borderRadius: 8,
//     backgroundColor: COLORS.lightGrey,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   placeholderText: {
//     color: COLORS.grey,
//   },
//   textContainer: {
//     marginBottom: 16,
//   },
//   textInput: {
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.secondary,
//     padding: 8,
//     fontSize: 16,
//   },
//   toolbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: COLORS.lightGrey,
//     paddingVertical: 8,
//   },
//   cardText: {
//     textAlign: 'center',
//     marginTop: 16,
//     padding: 8,
//   },
//   modal: {
//     backgroundColor: COLORS.white,
//     padding: 20,
//     margin: 20,
//     borderRadius: 12,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: COLORS.grey,
//   },
//   formatOption: {
//     marginBottom: 16,
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   sizeButton: {
//     padding: 8,
//     borderRadius: 4,
//     backgroundColor: COLORS.lightGrey,
//   },
//   selectedButton: {
//     backgroundColor: COLORS.primary,
//   },
//   buttonText: {
//     color: COLORS.grey,
//   },
// });

// export default BirthdayCard;

import React, { useState } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { IconButton, Modal, Portal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const COLORS = {
  primary: '#4A6741',
  secondary: '#8BA888',
  grey: '#484848',
  lightGrey: '#E8E8E8',
  white: '#FFFFFF',
};

const BirthdayCard = () => {
  const [cardState, setCardState] = useState({
    text: '',
    image: null,
    fontSize: 20,
    isBold: false,
    textColor: COLORS.grey,
  });
  
  const [isFormatModalVisible, setFormatModalVisible] = useState(false);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setCardState(prev => ({ ...prev, image: result.uri }));
      }
    } catch (error) {
      alert('Error picking image: ' + error.message);
    }
  };

  const updateTextFormat = (updates) => {
    setCardState(prev => ({ ...prev, ...updates }));
  };

  const ModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Text Formatting</Text>
      <View style={styles.formatOption}>
        <Text>Font Size</Text>
        <View style={styles.buttonGroup}>
          {[16, 20, 24, 28, 32].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                cardState.fontSize === size && styles.selectedButton,
              ]}
              onPress={() => updateTextFormat({ fontSize: size })}
            >
              <Text style={[
                styles.buttonText,
                cardState.fontSize === size && styles.selectedButtonText
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        {cardState.image ? (
          <Image 
            source={{ uri: cardState.image }} 
            style={styles.image} 
          />
        ) : (
          <TouchableOpacity 
            onPress={pickImage} 
            style={styles.imagePlaceholder}
          >
            <Text style={styles.placeholderText}>Tap to add an image</Text>
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Write your birthday message..."
            value={cardState.text}
            onChangeText={(text) => updateTextFormat({ text })}
            multiline
            placeholderTextColor={COLORS.grey}
          />
        </View>

        <View style={styles.toolbar}>
          <IconButton
            icon="format-bold"
            size={24}
            iconColor={cardState.isBold ? COLORS.primary : COLORS.grey}
            onPress={() => updateTextFormat({ isBold: !cardState.isBold })}
            style={styles.toolbarIcon}
          />
          <IconButton
            icon="format-size"
            size={24}
            iconColor={COLORS.grey}
            onPress={() => setFormatModalVisible(true)}
            style={styles.toolbarIcon}
          />
          <IconButton
            icon="image"
            size={24}
            iconColor={COLORS.grey}
            onPress={pickImage}
            style={styles.toolbarIcon}
          />
        </View>

        <Text
          style={[
            styles.cardText,
            {
              fontSize: cardState.fontSize,
              color: cardState.textColor,
              fontWeight: cardState.isBold ? 'bold' : 'normal',
            },
          ]}
        >
          {cardState.text}
        </Text>
      </View>

      <Modal
        visible={isFormatModalVisible}
        onDismiss={() => setFormatModalVisible(false)}
        contentContainerStyle={styles.modal}
        style={{ pointerEvents: 'auto' }}
      >
        <ModalContent />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  cardContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    color: COLORS.grey,
  },
  textContainer: {
    marginBottom: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    padding: 8,
    fontSize: 16,
    color: COLORS.grey,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    paddingVertical: 8,
  },
  toolbarIcon: {
    margin: 0,
  },
  cardText: {
    textAlign: 'center',
    marginTop: 16,
    padding: 8,
  },
  modal: {
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 12,
    padding: 0,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.grey,
  },
  formatOption: {
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sizeButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: COLORS.lightGrey,
    minWidth: 48,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.grey,
  },
  selectedButtonText: {
    color: COLORS.white,
  },
});

export default BirthdayCard;
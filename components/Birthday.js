import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  Animated,
  Platform,
  Share,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Predefined card templates with unique designs and default messages
const CARD_TEMPLATES = [
  {
    id: 1,
    name: "Party Time",
    backgroundColor: '#FF69B4',
    decorations: ["🎈", "🎉", "⭐️", "✨"],
    defaultText: "Wishing you the most amazing birthday filled with joy!"
  },
  {
    id: 2,
    name: "Sweet Celebration",
    backgroundColor: '#9370DB',
    decorations: ["🎂", "🎊", "🎵", "🎸"],
    defaultText: "May your day be as sweet as cake!"
  },
  {
    id: 3,
    name: "Festive Fun",
    backgroundColor: '#4169E1',
    decorations: ["🎁", "🎨", "🎭", "🌟"],
    defaultText: "Here's to celebrating you on your special day!"
  },
  {
    id: 4,
    name: "Rainbow Joy",
    backgroundColor: '#FF6347',
    decorations: ["🌈", "💫", "✨", "🎪"],
    defaultText: "Happy Birthday! May your day sparkle and shine!"
  }
];

// Component for rendering animated decoration emojis on the card
const DecorationItem = ({ emoji, style }) => {
  const bounceValue = new Animated.Value(0); // Animation value for bouncing effect

  // Start the bouncing animation when the component mounts
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Apply the animated translateY effect to the emoji
  const animatedStyle = {
    transform: [{
      translateY: bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10]
      })
    }]
  };

  return (
    <Animated.Text style={[styles.decoration, style, animatedStyle]}>
      {emoji}
    </Animated.Text>
  );
};

// Main component for the Birthday Card App
const BirthdayCardApp = () => {
  // State variables for managing cards, templates, and form inputs
  const [cards, setCards] = useState([]); // Stores all created cards
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Selected card template
  const [customMessage, setCustomMessage] = useState(''); // Custom message for the card
  const [fromName, setFromName] = useState(''); // Sender's name
  const [toName, setToName] = useState(''); // Recipient's name
  const [isTemplateModalVisible, setTemplateModalVisible] = useState(false); // Controls template selection modal visibility
  const [isCreating, setIsCreating] = useState(false); // Toggles between creating and viewing cards
  const [isEditing, setIsEditing] = useState(false); // Tracks if a card is being edited
  const [editingCardId, setEditingCardId] = useState(null); // ID of the card being edited

  // Load saved cards from AsyncStorage when the component mounts
  useEffect(() => {
    loadCards();
  }, []);

  // Function to load saved cards from AsyncStorage
  const loadCards = async () => {
    try {
      const savedCards = await AsyncStorage.getItem('birthdayCards');
      if (savedCards) {
        setCards(JSON.parse(savedCards)); // Update state with saved cards
      }
    } catch (error) {
      console.error('Error loading cards:', error);
      Alert.alert('Error', 'Failed to load cards. Please try again.');
    }
  };

  // Function to handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template); // Set the selected template
    setCustomMessage(template.defaultText); // Pre-fill the message with the template's default text
    setTemplateModalVisible(false); // Close the template selection modal
  };

  // Function to save a new card
  const handleSaveCard = async () => {
    if (!selectedTemplate || !customMessage || !fromName || !toName) return; // Validate inputs

    const newCard = {
      id: Date.now(), // Generate a unique ID for the card
      template: selectedTemplate,
      message: customMessage,
      from: fromName,
      to: toName,
      createdAt: new Date().toISOString() // Add a timestamp
    };

    const updatedCards = [...cards, newCard]; // Add the new card to the list
    try {
      await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards)); // Save to AsyncStorage
      setCards(updatedCards); // Update state
      setIsCreating(false); // Exit create mode
      resetForm(); // Clear the form
    } catch (error) {
      console.error('Error saving card:', error);
      Alert.alert('Error', 'Failed to save the card. Please try again.');
    }
  };

  // Function to handle editing an existing card
  const handleEditCard = (card) => {
    setIsEditing(true); // Enable edit mode
    setIsCreating(true); // Switch to create form
    setEditingCardId(card.id); // Set the ID of the card being edited
    setSelectedTemplate(card.template); // Pre-fill the template
    setCustomMessage(card.message); // Pre-fill the message
    setFromName(card.from); // Pre-fill the sender's name
    setToName(card.to); // Pre-fill the recipient's name
  };

  // Function to update an existing card
  const handleUpdate = async () => {
    if (!selectedTemplate || !customMessage || !fromName || !toName) return; // Validate inputs

    const updatedCards = cards.map(card => {
      if (card.id === editingCardId) {
        return {
          ...card,
          template: selectedTemplate,
          message: customMessage,
          from: fromName,
          to: toName,
          updatedAt: new Date().toISOString() // Add an update timestamp
        };
      }
      return card;
    });

    try {
      await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards)); // Save updated cards
      setCards(updatedCards); // Update state
      setIsCreating(false); // Exit create mode
      setIsEditing(false); // Disable edit mode
      resetForm(); // Clear the form
    } catch (error) {
      console.error('Error updating card:', error);
      Alert.alert('Error', 'Failed to update the card. Please try again.');
    }
  };

  // Function to delete a card
  const handleDeleteCard = async (cardId) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedCards = cards.filter(card => card.id !== cardId); // Remove the card
            try {
              await AsyncStorage.setItem('birthdayCards', JSON.stringify(updatedCards)); // Save updated list
              setCards(updatedCards); // Update state
            } catch (error) {
              console.error('Error deleting card:', error);
              Alert.alert('Error', 'Failed to delete the card. Please try again.');
            }
          }
        }
      ]
    );
  };

  // Function to share a card
  const handleShare = async (card) => {
    try {
      const shareMessage = `🎉 Birthday Card 🎉\n\nTo: ${card.to}\n\n${card.message}\n\nFrom: ${card.from}\n\n${card.template.decorations.join(' ')}`;
      await Share.share({
        message: shareMessage,
        title: 'Birthday Card',
      });
    } catch (error) {
      console.error('Error sharing card:', error);
      Alert.alert('Error', 'Failed to share the card. Please try again.');
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setSelectedTemplate(null);
    setCustomMessage('');
    setFromName('');
    setToName('');
    setEditingCardId(null);
    setIsEditing(false);
  };

  // Function to render a single card in the list
  const renderCard = ({ item }) => {
    if (!item.template) {
      return null; // Skip rendering if the template is missing
    }

    return (
      <View style={[styles.card, { backgroundColor: item.template.backgroundColor }]}>
        {/* Render decorations */}
        {item.template.decorations.map((decoration, index) => (
          <DecorationItem
            key={index}
            emoji={decoration}
            style={[
              index === 0 && styles.topLeft,
              index === 1 && styles.topRight,
              index === 2 && styles.bottomLeft,
              index === 3 && styles.bottomRight,
            ]}
          />
        ))}
        {/* Card content */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTo}>To: {item.to}</Text>
          <Text style={styles.cardMessage}>{item.message}</Text>
          <Text style={styles.cardFrom}>From: {item.from}</Text>
          {/* Card actions (Edit, Share, Delete) */}
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => handleEditCard(item)}
            >
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.shareButton]}
              onPress={() => handleShare(item)}
            >
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDeleteCard(item.id)}
            >
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with title and create button */}
      <View style={styles.header}>
        <Text style={styles.title}>Birthday Card Creator</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => {
            setIsCreating(!isCreating);
            if (!isCreating) {
              resetForm(); // Reset form when switching to create mode
            }
          }}
        >
          <Text style={styles.createButtonText}>
            {isCreating ? 'View Cards' : 'Create New Card'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display create form or card list based on isCreating state */}
      {isCreating ? (
        <ScrollView style={styles.createForm}>
          {/* Template selection button */}
          <TouchableOpacity
            style={styles.templateSelector}
            onPress={() => setTemplateModalVisible(true)}
          >
            <Text style={styles.templateSelectorText}>
              {selectedTemplate ? selectedTemplate.name : 'Select Template'}
            </Text>
          </TouchableOpacity>

          {/* Input fields for recipient, message, and sender */}
          <TextInput
            style={styles.input}
            placeholder="To"
            value={toName}
            onChangeText={setToName}
            placeholderTextColor="#666"
          />
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Write your birthday message..."
            value={customMessage}
            onChangeText={setCustomMessage}
            multiline
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="From"
            value={fromName}
            onChangeText={setFromName}
            placeholderTextColor="#666"
          />

          {/* Save/Update button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              (!selectedTemplate || !customMessage || !fromName || !toName) && styles.disabledButton
            ]}
            onPress={isEditing ? handleUpdate : handleSaveCard}
            disabled={!selectedTemplate || !customMessage || !fromName || !toName}
          >
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Update Card' : 'Save Card'}
            </Text>
          </TouchableOpacity>

          {/* Cancel edit button (visible only in edit mode) */}
          {isEditing && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                resetForm();
                setIsCreating(false);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel Edit</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      ) : (
        // Display list of cards
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.cardList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No cards created yet. Click "Create New Card" to get started!
            </Text>
          }
        />
      )}

      {/* Template selection modal */}
      <Modal
        visible={isTemplateModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTemplateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Template</Text>
            {/* Render all available templates */}
            {CARD_TEMPLATES.map(template => (
              <TouchableOpacity
                key={template.id}
                style={[styles.templateOption, { backgroundColor: template.backgroundColor }]}
                onPress={() => handleTemplateSelect(template)}
              >
                <Text style={styles.templateOptionText}>{template.name}</Text>
                <Text style={styles.templateDecorations}>
                  {template.decorations.join(' ')}
                </Text>
              </TouchableOpacity>
            ))}
            {/* Close modal button */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setTemplateModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FF1493',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hotpink',
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createButtonText: {
    color: '#FF1493',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createForm: {
    flex: 1,
  },
  templateSelector: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  templateSelectorText: {
    color: '#333',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FF1493',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#FFB6C1',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardList: {
    padding: 8,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  cardTo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardMessage: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    lineHeight: 24,
  },
  cardFrom: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  shareButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  decoration: {
    position: 'absolute',
    fontSize: 24,
  },
  topLeft: {
    top: 10,
    left: 10,
  },
  topRight: {
    top: 10,
    right: 10,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  templateOption: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  templateOptionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  templateDecorations: {
    fontSize: 20,
    marginTop: 5,
  },
  modalCloseButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
  }
});

export default BirthdayCardApp;
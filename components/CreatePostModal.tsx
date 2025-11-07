import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onPost: (content: string) => void;
  isDarkMode: boolean;
}

export default function CreatePostModal({ visible, onClose, onPost, isDarkMode }: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handlePost = () => {
    if (content.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onPost(content);
      setContent('');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onClose();
              }}
            >
              <Text style={[styles.cancelText, { color: theme.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Create Post</Text>
            <TouchableOpacity
              onPress={handlePost}
              disabled={!content.trim()}
              style={styles.postButton}
            >
              <LinearGradient
                colors={content.trim() ? ['#667eea', '#764ba2'] : ['#8E8E93', '#8E8E93']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.postButtonGradient}
              >
                <Text style={styles.postButtonText}>Post</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.authorSection}>
              <View style={[styles.avatar, { backgroundColor: theme.cardBg }]}>
                <Text style={styles.avatarText}>😊</Text>
              </View>
              <View>
                <Text style={[styles.authorName, { color: theme.text }]}>You</Text>
                <View style={styles.audienceBadge}>
                  <Ionicons name="globe-outline" size={12} color="#8E8E93" />
                  <Text style={styles.audienceText}>Public</Text>
                </View>
              </View>
            </View>

            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="What's on your mind?"
              placeholderTextColor={theme.textSecondary}
              multiline
              value={content}
              onChangeText={setContent}
              autoFocus
            />

            <View style={styles.toolbar}>
              <TouchableOpacity style={[styles.toolButton, { backgroundColor: theme.cardBg }]}>
                <Ionicons name="image-outline" size={24} color="#34C759" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolButton, { backgroundColor: theme.cardBg }]}>
                <Ionicons name="videocam-outline" size={24} color="#FF3B30" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolButton, { backgroundColor: theme.cardBg }]}>
                <Ionicons name="location-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolButton, { backgroundColor: theme.cardBg }]}>
                <Ionicons name="happy-outline" size={24} color="#FF9500" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const lightTheme = {
  background: '#F5F5F7',
  surface: '#FFFFFF',
  cardBg: '#F9FAFB',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  border: '#E5E5EA',
};

const darkTheme = {
  background: '#000000',
  surface: '#1C1C1E',
  cardBg: '#2C2C2E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  cancelText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  postButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  postButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  audienceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  audienceText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  input: {
    fontSize: 17,
    lineHeight: 24,
    flex: 1,
    textAlignVertical: 'top',
  },
  toolbar: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
  },
  toolButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
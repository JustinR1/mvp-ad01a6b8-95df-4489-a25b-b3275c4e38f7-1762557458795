import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function ProfileModal({ visible, onClose, isDarkMode }: ProfileModalProps) {
  const theme = isDarkMode ? darkTheme : lightTheme;

  const stats = [
    { label: 'Posts', value: '127' },
    { label: 'Followers', value: '2.4K' },
    { label: 'Following', value: '892' },
  ];

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', color: '#667eea' },
    { icon: 'settings-outline', label: 'Settings', color: '#8E8E93' },
    { icon: 'bookmark-outline', label: 'Saved Posts', color: '#FF9500' },
    { icon: 'time-outline', label: 'Activity', color: '#34C759' },
    { icon: 'help-circle-outline', label: 'Help & Support', color: '#007AFF' },
    { icon: 'log-out-outline', label: 'Logout', color: '#FF3B30' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onClose();
            }}
            style={[styles.closeButton, { backgroundColor: theme.cardBg }]}
          >
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>😊</Text>
            </LinearGradient>
            <Text style={[styles.name, { color: theme.text }]}>John Doe</Text>
            <Text style={[styles.username, { color: theme.textSecondary }]}>@johndoe</Text>
            <Text style={[styles.bio, { color: theme.text }]}>
              Digital creator & tech enthusiast 🚀
              Building amazing things with React Native
            </Text>

            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.editButtonGradient}
                >
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.shareButton, { backgroundColor: theme.cardBg }]}>
                <Ionicons name="share-outline" size={20} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, { backgroundColor: theme.surface, borderColor: theme.border }]}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                </View>
                <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 48,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    marginBottom: 12,
  },
  bio: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  editButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  editButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});
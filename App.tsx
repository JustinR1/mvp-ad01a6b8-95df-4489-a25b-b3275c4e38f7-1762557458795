import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import ProfileModal from './components/ProfileModal';
import CreatePostModal from './components/CreatePostModal';
import Toast from './components/Toast';

const { width } = Dimensions.get('window');

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  liked: boolean;
  category: string;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: '👩‍💻',
      content: 'Just launched my new app! Built with React Native and Expo. The journey was challenging but incredibly rewarding. 🚀✨',
      likes: 342,
      comments: 28,
      shares: 12,
      time: '2h ago',
      liked: false,
      category: 'Tech',
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: '👨‍🎨',
      content: 'Beautiful sunset today at the beach 🌅 Nature never fails to amaze me. Taking a moment to appreciate the simple things.',
      image: 'sunset',
      likes: 1284,
      comments: 95,
      shares: 43,
      time: '5h ago',
      liked: true,
      category: 'Lifestyle',
    },
    {
      id: 3,
      author: 'Emma Davis',
      avatar: '👩‍🔬',
      content: 'Excited to start my new research project on AI and machine learning! The future of technology is here. 🤖💡',
      likes: 567,
      comments: 42,
      shares: 28,
      time: '1d ago',
      liked: false,
      category: 'Science',
    },
    {
      id: 4,
      author: 'Alex Rivera',
      avatar: '👨‍🍳',
      content: 'New recipe alert! Made the most delicious pasta carbonara today. Sometimes the classics are the best. 🍝👨‍🍳',
      likes: 892,
      comments: 67,
      shares: 34,
      time: '2d ago',
      liked: false,
      category: 'Food',
    },
  ]);

  const handleLike = (postId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleShare = (post: Post) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setToast({ visible: true, message: 'Post shared successfully!', type: 'success' });
  };

  const handleTabChange = (tab: string) => {
    Haptics.selectionAsync();
    setActiveTab(tab);
  };

  const toggleDarkMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />

      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            <Ionicons name="flash" size={20} color="#FFFFFF" />
          </LinearGradient>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Social</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.cardBg }]}
            onPress={toggleDarkMode}
          >
            <Ionicons
              name={isDarkMode ? 'sunny' : 'moon'}
              size={20}
              color={theme.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.cardBg }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Ionicons name="notifications" size={20} color={theme.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
      >
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.addStory}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.storyCircle}
              >
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={[styles.storyText, { color: theme.textSecondary }]}>Your Story</Text>
            </TouchableOpacity>
            {['👩‍💼', '👨‍💻', '👩‍🎨', '👨‍🔬', '👩‍🚀'].map((avatar, index) => (
              <TouchableOpacity key={index} style={styles.storyItem}>
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.storyGradient}
                >
                  <View style={styles.storyInner}>
                    <Text style={styles.storyAvatar}>{avatar}</Text>
                  </View>
                </LinearGradient>
                <Text style={[styles.storyText, { color: theme.textSecondary }]}>User {index + 1}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {posts.map(post => (
          <View key={post.id} style={[styles.postCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={styles.postHeader}>
              <View style={styles.postAuthor}>
                <View style={[styles.avatarContainer, { backgroundColor: theme.cardBg }]}>
                  <Text style={styles.avatar}>{post.avatar}</Text>
                </View>
                <View style={styles.postInfo}>
                  <Text style={[styles.authorName, { color: theme.text }]}>{post.author}</Text>
                  <View style={styles.postMeta}>
                    <Text style={[styles.postTime, { color: theme.textSecondary }]}>{post.time}</Text>
                    <Text style={[styles.dot, { color: theme.textSecondary }]}>•</Text>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{post.category}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={[styles.moreButton, { backgroundColor: theme.cardBg }]}>
                <Ionicons name="ellipsis-horizontal" size={18} color={theme.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.postContent, { color: theme.text }]}>{post.content}</Text>

            {post.image && (
              <View style={styles.postImage}>
                <LinearGradient
                  colors={['#ffecd2', '#fcb69f']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.imagePlaceholder}
                >
                  <Ionicons name="image" size={48} color="#FFFFFF" />
                </LinearGradient>
              </View>
            )}

            <View style={[styles.postStats, { borderTopColor: theme.border }]}>
              <Text style={[styles.statsText, { color: theme.textSecondary }]}>
                {post.likes.toLocaleString()} likes
              </Text>
              <Text style={[styles.statsText, { color: theme.textSecondary }]}>
                {post.comments} comments • {post.shares} shares
              </Text>
            </View>

            <View style={[styles.postActions, { borderTopColor: theme.border }]}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Ionicons
                  name={post.liked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={post.liked ? '#FF3B30' : theme.text}
                />
                <Text style={[styles.actionText, { color: post.liked ? '#FF3B30' : theme.text }]}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={24} color={theme.text} />
                <Text style={[styles.actionText, { color: theme.text }]}>Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(post)}
              >
                <Ionicons name="arrow-redo-outline" size={24} color={theme.text} />
                <Text style={[styles.actionText, { color: theme.text }]}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.bottomNav, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleTabChange('home')}
        >
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={26}
            color={activeTab === 'home' ? '#667eea' : theme.textSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleTabChange('search')}
        >
          <Ionicons
            name={activeTab === 'search' ? 'search' : 'search-outline'}
            size={26}
            color={activeTab === 'search' ? '#667eea' : theme.textSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButtonCenter}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setShowCreatePost(true);
          }}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButton}
          >
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleTabChange('notifications')}
        >
          <Ionicons
            name={activeTab === 'notifications' ? 'notifications' : 'notifications-outline'}
            size={26}
            color={activeTab === 'notifications' ? '#667eea' : theme.textSecondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowProfile(true);
          }}
        >
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={26}
            color={activeTab === 'profile' ? '#667eea' : theme.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ProfileModal
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        isDarkMode={isDarkMode}
      />

      <CreatePostModal
        visible={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onPost={(content) => {
          const newPost: Post = {
            id: posts.length + 1,
            author: 'You',
            avatar: '😊',
            content,
            likes: 0,
            comments: 0,
            shares: 0,
            time: 'Just now',
            liked: false,
            category: 'General',
          };
          setPosts([newPost, ...posts]);
          setShowCreatePost(false);
          setToast({ visible: true, message: 'Post created successfully!', type: 'success' });
        }}
        isDarkMode={isDarkMode}
      />
    </SafeAreaView>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: 20,
  },
  storiesContainer: {
    paddingVertical: 16,
    paddingLeft: 20,
  },
  addStory: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyGradient: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  storyInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatar: {
    fontSize: 28,
  },
  storyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  postCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
  },
  postInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postTime: {
    fontSize: 13,
  },
  dot: {
    fontSize: 13,
  },
  categoryBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  postImage: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  statsText: {
    fontSize: 13,
    fontWeight: '500',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  navButton: {
    padding: 12,
  },
  navButtonCenter: {
    marginTop: -24,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
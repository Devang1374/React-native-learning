import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createUser, getUser } from '../services/userService';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const STATIC_PASSWORD = 'Devang@2363';

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Desktop stays 2 per row; Android/mobile shows 2 if width >= 380, otherwise 1
  const isDesktop = Platform.OS === 'web';
  const showTwoColumns = isDesktop || width >= 380;
  const rowStyle = [
    styles.row,
    { flexDirection: showTwoColumns ? ('row' as const) : ('column' as const) },
  ];

  const languages = [
    { id: '1', name: 'JavaScript' },
    { id: '2', name: 'PHP' },
    { id: '3', name: 'Python' },
    { id: '4', name: 'Java' },
    { id: '5', name: 'Dart' },
  ];

  useEffect(() => {
    alert('Hello, Wellcome to My website')
  }, [count]);

  function sayHello() {
    if (name.trim() === '') {
      setMessage('Please enter your name');
    } else {
      setMessage(`Hello ${name}`);
    }
  }

  async function fetchUser() {
    try {
      setLoading(true);
      setError(null);

      const data = await getUser();
      setUsers(data || []);

    } catch (err: any) {
      setError(err?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }

  function handleUnlock() {
    if (passwordInput === STATIC_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  async function addUser() {
    if (userName.trim() === '' || userEmail.trim() === '') {
      alert('Please enter both name and email');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let userData = {
        name: userName,
        email: userEmail
      };

      const data = await createUser(userData);
      setUsers((prev) => [data, ...prev]);
      setUserName('');
      setUserEmail('');
      alert('User created successfully!');

    } catch (err: any) {
      setError(err?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <View
        style={[
          styles.lockContainer,
          {
            paddingTop: Math.max(insets.top, 24),
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}>
        <View style={styles.lockCard}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.lockTitle}>Protected Screen</Text>
          <Text style={styles.lockSubtitle}>
            Please enter your password to continue
          </Text>

          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              placeholder="Enter password..."
              placeholderTextColor="#999"
              value={passwordInput}
              onChangeText={(text) => {
                setPasswordInput(text);
                if (passwordError) setPasswordError('');
              }}
              onSubmitEditing={handleUnlock}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(!showPassword)}>
              <Text style={{ fontSize: 18 }}>{showPassword ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>

          {passwordError ? (
            <Text style={styles.lockErrorText}>{passwordError}</Text>
          ) : null}

          <TouchableOpacity style={styles.unlockBtn} onPress={handleUnlock}>
            <Text style={styles.unlockBtnText}>Unlock</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: Math.max(insets.top, 16),
          paddingBottom: Math.max(insets.bottom, 36),
        },
      ]}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      alwaysBounceVertical={true}
      overScrollMode="always"
      showsVerticalScrollIndicator={false}>
      {/* Row 1: Welcome & Counter (2 on Desktop, 2 on Android if fits, else 1) */}
      <View style={rowStyle}>
        <View style={[styles.subContainer, { backgroundColor: '#f5c3f7' }]}>
          <Text style={styles.heading}>Hello World</Text>
          <WellcomeMessage name="Devang" />
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => alert('Heyyy!, You Clicked the Button!')}>
            <Text style={styles.primaryBtnText}>Click Me</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.subContainer, { backgroundColor: '#beb3eb' }]}>
          <Text style={styles.heading}>Counter: {count}</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setCount(count + 1)}>
              <Text style={styles.counterBtnText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.counterBtn, styles.resetBtn]}
              onPress={() => setCount(0)}>
              <Text style={styles.counterBtnText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setCount(count - 1)}>
              <Text style={styles.counterBtnText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Row 2: Name Input & List (2 on Desktop, 2 on Android if fits, else 1) */}
      <View style={rowStyle}>
        <View style={[styles.subContainer, { backgroundColor: '#21ffb5' }]}>
          <Text style={styles.label}>Enter Your Name:</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.primaryBtn} onPress={sayHello}>
            <Text style={styles.primaryBtnText}>Say Hello</Text>
          </TouchableOpacity>
          {message ? <Text style={styles.helloMessage}>{message}</Text> : null}
        </View>

        <View style={[styles.subContainer, { backgroundColor: '#f1a8b4', padding: 8 }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ width: '100%' }}
            data={languages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.listItem,
                  Number(item.id) % 2 !== 0 && { backgroundColor: '#f3ff86' },
                ]}>
                {item.name}
              </Text>
            )}
          />
        </View>
      </View>

      {/* Row 3: Banner (Always 1 container across) */}
      <View style={styles.bannerShadowWrapper}>
        <View style={styles.bannerContainer}>
          <Image
            source={require('@/assets/images/nature-banner.png')}
            style={styles.image}
          />
        </View>
      </View>

      {/* Row 4: Action & Placeholder */}
      <View style={rowStyle}>
        <View style={[styles.subContainer, { backgroundColor: '#ffd3b6' }]}>
          <Text style={styles.heading}>Interactive</Text>
          <Pressable
            style={({ pressed }) => [
              styles.pressableBtn,
              pressed && styles.pressableBtnPressed,
            ]}
            android_ripple={{ color: '#ffffff30' }}
            onPress={() => alert('Hey There')}>
            <Text style={styles.pressableBtnText}>✨ Click Me</Text>
          </Pressable>
        </View>

        <View style={[styles.subContainer, { backgroundColor: '#c5f0a4' }]}>
          <Text style={styles.heading}>Feature Box</Text>
          <Text style={styles.placeholderText}>Placeholder container</Text>
        </View>
      </View>

      {/* Row 5: Users List */}
      <View style={rowStyle}>
        <View style={[styles.subContainer, { backgroundColor: '#c7ecee', minHeight: 250, padding: 12 }]}>
          <Text style={styles.heading}>
            Users Directory {!loading && !error ? `(${users?.length || 0})` : ''}
          </Text>

          {loading ? (
            <View style={styles.statusBox}>
              <ActivityIndicator size="small" color="#6c5ce7" />
              <Text style={styles.placeholderText}>Loading users...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryBtn} onPress={fetchUser}>
                <Text style={styles.retryBtnText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : !users || users.length === 0 ? (
            <View style={styles.statusBox}>
              <Text style={styles.placeholderText}>No users found</Text>
            </View>
          ) : (
            <FlatList
              data={users}
              keyExtractor={(item) => String(item.id)}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={{ width: '100%', marginTop: 8 }}
              renderItem={({ item }) => (
                <View style={styles.userCard}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.avatarText}>
                      {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                    </Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                    {item.phone ? <Text style={styles.userPhone}>📞 {item.phone}</Text> : null}
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>

      {/* Row 6: Create User Form */}
      <View style={rowStyle}>
        <View style={[styles.subContainer, { backgroundColor: '#ffeaa7', minHeight: 240, padding: 16 }]}>
          <Text style={styles.heading}>Create User</Text>
          <View style={{ width: '100%', marginTop: 8 }}>
            <Text style={styles.label}>User Name:</Text>
            <TextInput
              style={styles.textInput}
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter name..."
              placeholderTextColor="#888"
            />

            <Text style={[styles.label, { marginTop: 10 }]}>User Email:</Text>
            <TextInput
              style={styles.textInput}
              value={userEmail}
              onChangeText={setUserEmail}
              placeholder="Enter email..."
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: '#e17055', marginTop: 14 }]}
              onPress={addUser}
              disabled={loading}>
              <Text style={styles.primaryBtnText}>
                {loading ? 'Adding...' : 'Add User'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function WellcomeMessage({ name }: { name?: string }) {
  return <Text style={styles.wellcomeMessage}>Welcome {name} to my App.</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89fff9',
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 16,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
  },

  row: {
    gap: 12,
    width: '100%',
  },

  bannerShadowWrapper: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#f79fe8', // Essential for Android elevation to cast rounded shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 6,
  },

  bannerContainer: {
    width: '100%',
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
  },

  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    minHeight: 190,
    padding: 12,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },

  wellcomeMessage: {
    fontSize: 14,
    color: '#0f13ff',
    textAlign: 'center',
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },

  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00000025',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 14,
  },

  primaryBtn: {
    backgroundColor: '#2d3436',
    width: '100%',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  counterRow: {
    flexDirection: 'row',
    gap: 6,
    width: '100%',
    marginTop: 10,
  },

  counterBtn: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  resetBtn: {
    flex: 1.4,
    backgroundColor: '#4834d4',
  },

  counterBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  helloMessage: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginTop: 8,
    textAlign: 'center',
  },

  listItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ed92ff',
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 12,
    textAlign: 'center',
    marginVertical: 4,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  pressableBtn: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },

  pressableBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },

  pressableBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  placeholderText: {
    fontSize: 14,
    color: '#2d3436',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 6,
  },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 14,
    marginVertical: 4,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#6c5ce7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2d3436',
  },

  userEmail: {
    fontSize: 13,
    color: '#636e72',
  },

  userPhone: {
    fontSize: 11,
    color: '#0984e3',
    marginTop: 2,
  },

  statusBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },

  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffeaa7',
    padding: 14,
    borderRadius: 14,
    marginVertical: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#fdcb6e',
  },

  errorIcon: {
    fontSize: 22,
    marginBottom: 4,
  },

  errorText: {
    fontSize: 13,
    color: '#d63031',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },

  retryBtn: {
    backgroundColor: '#d63031',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  retryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  lockContainer: {
    flex: 1,
    backgroundColor: '#89fff9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  lockCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  lockIcon: {
    fontSize: 46,
    marginBottom: 10,
  },

  lockTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 6,
    textAlign: 'center',
  },

  lockSubtitle: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 20,
    textAlign: 'center',
  },

  passwordInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f2f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dfe4ea',
    paddingHorizontal: 12,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#2d3436',
  },

  eyeBtn: {
    padding: 6,
  },

  lockErrorText: {
    color: '#d63031',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  unlockBtn: {
    width: '100%',
    backgroundColor: '#2d3436',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  unlockBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
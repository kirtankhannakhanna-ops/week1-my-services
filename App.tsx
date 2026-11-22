import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function App() {
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Haircut', price: 500 },
    { id: '2', name: 'Beard Trim', price: 300 },
    { id: '3', name: 'Facial', price: 1500 },
    { id: '4', name: 'Hair Wash', price: 200 },
    { id: '5', name: 'Head Massage', price: 400 },
  ]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleAddService = () => {
    if (name.trim() === '') {
      setError('Please enter a service name.');
      return;
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }

    const newService: Service = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parsedPrice,
    };

    setServices([...services, newService]);
    setName('');
    setPrice('');
    setError('');
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter((item) => item.id !== id));
  };

  const totalPrice = services.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Services</Text>
            <Text style={styles.subtitle}>Tap any service to remove</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{services.length} Items</Text>
          </View>
        </View>

        {/* Services List */}
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          style={styles.list}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => handleDeleteService(item.id)}
            >
              <View style={styles.cardLeft}>
                <View style={styles.dot} />
                <Text style={styles.serviceName}>{item.name}</Text>
              </View>
              <View style={styles.priceTag}>
                <Text style={styles.servicePrice}>Rs {item.price}</Text>
              </View>
            </Pressable>
          )}
        />

        {/* Total Summary Bar */}
        <View style={styles.summaryBar}>
          <Text style={styles.summaryLabel}>Total Menu Value</Text>
          <Text style={styles.summaryValue}>Rs {totalPrice}</Text>
        </View>

        {/* Add Service Form */}
        <View style={styles.form}>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 2 }]}
              placeholder="Service name"
              placeholderTextColor="#94A3B8"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Price"
              placeholderTextColor="#94A3B8"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleAddService}
          >
            <Text style={styles.buttonText}>+ Add Service</Text>
          </Pressable>

          {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 42,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#1D4ED8',
    fontWeight: '700',
    fontSize: 13,
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
  },
  cardPressed: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  priceTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563EB',
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  summaryLabel: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  form: {
    paddingVertical: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1D4ED8',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: '#DC2626',
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
  },
});
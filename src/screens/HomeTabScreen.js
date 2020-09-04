import React from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import { FAB, List } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import appColors from '../appColors';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  listTitle: {
    fontSize: 16,
  },
  listFees: {
    fontSize: 18,
    marginVertical: 10,
  },
});

/**
 * Home Screen
 * @author Rounak Saha
 */
export default ({ navigation }) => {
  return (
    <>
      <FlatList
        data={[
          { id: 1, name: 'Soham', description: 'Class 5', fees: 800 },
          { id: 2, name: 'Soham 2', description: 'Class65', fees: 800 },
        ]}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <List.Item style={styles.listItem} titleStyle={styles.listTitle}
            title={item.name} titleNumberOfLines={2} titleEllipsizeMode="tail"
            description={item.description} descriptionNumberOfLines={1} descriptionEllipsizeMode="tail"
            right={p => <Text {...p} style={styles.listFees}>{`Rs.${item.fees}`}</Text>}
            onPress={() => navigation.navigate('StudentFeesDetails', item)}
          />
        )}
      />
      <FAB style={styles.fab}
        icon={p => <AntDesign {...p} name="plus" />}
        onPress={() => navigation.navigate('AddStudent')}
      />
    </>
  );
}
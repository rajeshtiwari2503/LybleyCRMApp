import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import SkillItem from './SkillItem';
 

const Skills = () => {
  // const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     
  }, []);

  const skills=[
    {
      _id:1,
      title:"title ",
      description:"title ",
      videoUrl:"title ",
    }
  ]

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills</Text>
      <FlatList
        data={skills}
        renderItem={({ item }) => <SkillItem skill={item} />}
        keyExtractor={item => item?._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Skills;

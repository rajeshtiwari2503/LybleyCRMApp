import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const SkillItem = ({ skill }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{skill?.title}</Text>
      <Text style={styles.description}>{skill?.description}</Text>
      <Text style={styles.video}>{skill?.description}</Text>
      {/* {skill.videoUrl ? (
        <Video
          source={{ uri: skill?.videoUrl }}
          style={styles.video}
          controls={true}
        />
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    // width:300
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    marginBottom: 8
  },
  video: {
    height: 200,
    width: '100%',
    marginTop: 10
  }
});

export default SkillItem;
